import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    uz: { type: String, required: true }, // Uzbek name
    ru: { type: String, required: true }, // Russian name
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Array of product IDs
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
