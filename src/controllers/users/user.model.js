import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  location: { type: String },
  password: { type: String },
  phone: { type: String, required: true ,unique:true },
  favorite: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

const User = mongoose.model("User", userSchema);

export default User;
