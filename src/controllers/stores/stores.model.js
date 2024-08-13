import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  descr: { type: String },
  phone: { type: String, unique: true, required: true },
  location: { type: String },
   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Store = mongoose.model("Store", storeSchema);

export default Store;
