import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    uz: { type: String }, // Uzbek name
    ru: { type: String }, // Russian name
  },
  description: {
    uz: { type: String }, // Uzbek description
    ru: { type: String }, // Russian description
  },
  price: { type: Number, required: true },
  images: [{ type: String }],
  review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  count: { type: Number },
  id_name: { type: String, unique: true, required: true },
});


productSchema.pre("save", async function (next) {
  if (!this.id_name) {
    // Generate id_name from the Uzbek name if provided
    if (this.name.uz) {
      let idName = slugify(this.name.uz, { lower: true, strict: true });
      
      // Ensure id_name is unique
      let existingStore = await mongoose.models.Store.findOne({
        id_name: idName,
      });
      if (existingStore) {
        idName = `${idName}-${uuidv4().slice(0, 8)}`;
      }
      
      this.id_name = idName;
    } else {
      // If no Uzbek name is provided, generate a random id_name
      this.id_name = `${uuidv4().slice(0, 8)}`;
    }
  } else {
    // Ensure manually provided id_name is unique
    let existingProduct = await mongoose.models.productSchema.findOne({
      id_name: this.id_name,
    });
    if (existingProduct) {
      return next(new Error("id_name must be unique"));
    }
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
