import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  l_name:{ type: String, required: true},
  age: { type: Number },
  location: { type: String },
  phone: { type: String, required: true ,unique:true },
  favorite: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

const User = mongoose.model("User", userSchema);

export default User;
