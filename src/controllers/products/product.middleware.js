import Joi from "joi";
import Product from "./product.model.js"; // Adjust path as necessary
import Category from "../category/category.model.js"; // Adjust path as necessary
import Store from "../stores/stores.model.js"; // Adjust path as necessary
import SubCategory from "../sub-category/sub-category.model.js";

const productSchema = Joi.object({
  name_uz: Joi.string().required(),
  name_ru: Joi.string(),
  description_uz: Joi.string(),
  description_ru: Joi.string(),
  images: Joi.array(),
  id_name: Joi.string().alphanum().min(3).max(50),
  category_id: Joi.string().required(), // ObjectId pattern
  count: Joi.number().integer().min(0).required(),
  price: Joi.number().greater(0).required(),
  store_id: Joi.string().required(), // Assuming you have a store_id
  gender: Joi.string().valid("male", "female", "kids", "all"),
});
const UpdateProductSchema = Joi.object({
  name_uz: Joi.string(),
  name_ru: Joi.string(),
  images: Joi.array(),
  description_uz: Joi.string(),
  description_ru: Joi.string(),
  id_name: Joi.string().alphanum().min(3).max(50),
  category_id: Joi.string(),
  count: Joi.number().integer().min(0),
  price: Joi.number().greater(0),
  store_id: Joi.string(),
  gender: Joi.string().valid("male", "female", "kids", "all"),
});




export default {
 async PostProductMiddleware(req, res, next){
  try {
    // Step 1: Validate the incoming data
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Step 2: Check for uniqueness of id_name
    const existingProduct = await Product.findOne({
      id_name: req.body.id_name,
    });
    if (existingProduct) {
      return res.status(409).json({ message: "id_name must be unique." });
    }

    // Step 3: Check if category exists
    const category = await SubCategory.findById(req.body.category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Step 4: Check if store exists
    const store = await Store.findById(req.body.store_id);
    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Attach the valid category and store to req object
    req.category = category;
    req.store = store;

    next(); // Proceed to the next middleware or controller
  } catch (err) {
    console.error("Error in product middleware:", err);
    res.status(500).json({ message: "Internal server error" });
  }
  },
  
  async PutProductMiddleware (req, res, next){
  try {
    // Step 1: Validate the incoming data
    const { error } = UpdateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Step 2: Check for uniqueness of id_name
    const existingProduct = await Product.findOne({
      id_name: req.body.id_name,
      _id: { $ne: req.params.id },
    });
    if (existingProduct) {
      return res.status(409).json({ message: "id_name must be unique." });
    }

    // Step 3: Check if category exists
    const category = await SubCategory.findById(req.body.category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Step 4: Check if store exists
    const store = await Store.findById(req.body.store_id);
    if (!store) {
      return res.status(404).json({ message: "Store not found." });
    }

    // Attach the valid category and store to req object
    req.category = category;
    req.store = store;

    next(); // Proceed to the next middleware or controller
  } catch (err) {
    console.error("Error in product middleware:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
};
