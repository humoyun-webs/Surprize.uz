import mongoose from "mongoose";
import Store from "../stores/stores.model.js"; // Assuming you have a Store model

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    role: { type: String, enum: ["admin", "store_admin"], required: true },
    contract: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" }, // Changed to single store reference
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isNew) {
    if (this.role === "store_admin") {
      // Create a store for the new store_admin
      const Store = mongoose.model("Store");
      const newStore = new Store({
        name: { uz: `${this.name}'s store` },
        descr: { uz: "Default description" },
        phone: this.phone, // Assuming store phone is the same as admin phone
      });
      await newStore.save();

      // Assign the newly created store to the store_admin
      this.store = newStore._id
    }

  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
