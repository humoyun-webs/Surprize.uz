import Joi from "joi";
import Product from "./product.model.js";

// Joi schema for validating the incoming product data


const PostProductMiddleware = async (req, res, next) => {
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

    next(); // Proceed to the next middleware or controller
  } catch (err) {
    console.error("Error in product middleware:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default PostProductMiddleware;

// SCHEMAS FOR JOI

const productSchema = Joi.object({
  name_uz: Joi.string().required(),
  name_ru: Joi.string(),
  description_uz: Joi.string(),
  description_ru: Joi.string(),
  id_name: Joi.string().alphanum().min(3).max(50),
  category: Joi.string()
    .required(), // ObjectId pattern
  count: Joi.number().integer().min(0).required(),
  price: Joi.number().greater(0).required(),
});