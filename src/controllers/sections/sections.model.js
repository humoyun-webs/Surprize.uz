import mongoose from "mongoose";

const sectionsSchema = new mongoose.Schema({
  name: {
    uz: { type: String, required: true },
    ru: { type: String, required: true },
  },
  description: {
    uz: { type: String },
    ru: { type: String },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Sections = mongoose.model("Sections", sectionsSchema);

export default Sections;
