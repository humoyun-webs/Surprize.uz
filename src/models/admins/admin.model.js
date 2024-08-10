import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  role: { type: String, enum: ["admin", "operator"], required: true },
  contract: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
  stores: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
