import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: {
    uz: { type: String, required: true }, // Uzbek name
    ru: { type: String, required: true }, // Russian name
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  gender: { type: String, enum: ["male", "female", "kids", "all"] },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
