import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  descr: { type: String },
  images: [{ type: String }],
  review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  count: { type: Number },
  idname: { type: String, unique: true, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
