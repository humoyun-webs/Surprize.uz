import Joi from "joi";
// import User from "../user/user.model.js"; // Adjust path as necessary
import Product from "../products/product.model.js"; // Adjust path as necessary
import Review from "./review.model.js"; // Adjust path as necessary
import Order from "../order/order.model.js"; // Adjust path as necessary

// Joi schema for review validation
const reviewSchema = Joi.object({
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
    let userId = req.id;
    let productId = req.body.product;
    const order = await Order.findOne({
      user: userId,
      products: { $in: [productId] },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order with the specified user and product not found",
      });
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
