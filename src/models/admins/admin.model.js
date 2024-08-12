import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  role: { type: String, enum: ["admin", "store_admin"], required: true },
  contract: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
  stores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6 },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;