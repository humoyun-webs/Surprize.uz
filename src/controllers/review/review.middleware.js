import Joi from "joi";
// import User from "../user/user.model.js"; // Adjust path as necessary
import Product from "../products/product.model.js"; // Adjust path as necessary
import Review from "./review.model.js"; // Adjust path as necessary

// Joi schema for review validation
const reviewSchema = Joi.object({
  user: Joi.string().required(), // Assuming user is a string (ObjectId)
  product: Joi.string().required(), // Assuming product is a string (ObjectId)
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional(),
});
 
const reviewMiddleware = {
  // Validate review data using Joi and check existence of user and product
  async validateReviewData(req, res, next) {
    // Validate the review data with Joi
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }



    // Check if product exists
    const productExists = await Product.findById(req.body.product);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    next(); // Proceed to the next middleware or controller
  },

  // Check if the review exists by ID
  async validateReviewExistence(req, res, next) {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      req.review = review; // Attach the review to req object for use in controllers
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      console.error("Error validating review existence:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default reviewMiddleware;
