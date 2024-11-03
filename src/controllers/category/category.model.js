import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    uz: { type: String, required: true },
    ru: { type: String, required: true },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
  gender: {
    type: [String],
    enum: ["male", "female", "kids"],
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
