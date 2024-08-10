import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  location: { type: String },
  phone: { type: String, required: true ,unique:true },
  favorite: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
