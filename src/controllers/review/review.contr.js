import Product from "../products/product.model.js";
import Store from "../stores/stores.model.js";
import Review from "./review.model.js";

const reviewController = {
  // Create a new review
  async create(req, res) {
  try {
    const { product : product_id, rating, comment } = req.body;

    // Create and save the review
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
 
    const storeId = product.store;
    const review = new Review({ user: req.id, product: product_id, rating, comment });
    await review.save();

    // Add review to product and store
    product.reviews.push(review._id);
    await product.save();

    await Store.findByIdAndUpdate(storeId, {
      $push: { reviews: review._id },
    });

    // Update ratings
    await updateRatings(product_id, storeId);

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
},

// Function to update product and store ratings



  // Get all reviews
  async getAll(req, res) {
    try {
      const reviews = await Review.find().populate("user").populate("product");
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get a review by ID
  async getById(req, res) {
    try {
      const review = await Review.findById(req.params.id)
        .populate("user")
        .populate("product");
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(200).json(review);
    } catch (error) {
      console.error("Error fetching review:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update a review
  async update(req, res) {
    try {
      const { rating, comment } = req.body;
      const review = await Review.findByIdAndUpdate(
        req.params.id,
        { rating, comment },
        { new: true }
      ).populate("user").populate("product");

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      res.status(200).json(review);
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Delete a review
  async delete(req, res) {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default reviewController;
let updateRatings= async (productId, storeId) => {
  try {
    // Update product rating
    const product = await Product.findById(productId).populate('reviews');
    if (product) {
      const productReviews = product.reviews;
      const productRating =
        productReviews
          .reduce((sum, review) => sum + review.rating, 0)
          .toFixed(1) / productReviews.length;
      await Product.findByIdAndUpdate(productId, { rating: productRating });
    }

    // Update store rating
    const store = await Store.findById(storeId).populate('reviews');
    if (store) {
      const storeReviews = store.reviews;
      const storeRating =
        storeReviews
          .reduce((sum, review) => sum + review.rating, 0)
          .toFixed(1) / storeReviews.length;
      await Store.findByIdAndUpdate(storeId, { rating: storeRating });
    }
  } catch (error) {
    console.error("Error updating ratings:", error);
  }
}