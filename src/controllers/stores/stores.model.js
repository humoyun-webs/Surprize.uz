import mongoose from "mongoose";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

const storeSchema = new mongoose.Schema(
  {
    name: {
      uz: { type: String }, // Uzbek name
      ru: { type: String }, // Russian name
    },
    description: {
      uz: { type: String }, // Uzbek description
      ru: { type: String }, // Russian description
    },
    id_name: { type: String, unique: true }, // Unique id_name based on Uzbek name
    image: { type: String },
    phone: { type: String, unique: true, required: true },
    location: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    rating: { type: Number, default: 0 },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

storeSchema.pre("save", async function (next) {
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
    let existingStore = await mongoose.models.Store.findOne({
      id_name: this.id_name,
      _id: { $ne: this._id },
    });
    if (existingStore) {
      return next(new Error("id_name must be unique"));
    }
  }
  next();
});

const Store = mongoose.model("Store", storeSchema);

export default Store;
