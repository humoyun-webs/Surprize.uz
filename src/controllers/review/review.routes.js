import express from "express";
import reviewController from "./review.contr.js"; // Adjust the path as necessary
import reviewMiddleware from "./review.middleware.js"; // Adjust path as necessary

const router = express.Router();

// Middleware to validate review data
router.post("/",  reviewController.create);

router.get("/", reviewController.getAll);
router.get(
  "/:id",
  reviewMiddleware.validateReviewExistence,
  reviewController.getById
);
router.put(
  "/:id",
//   reviewMiddleware.validateReviewData,
//   reviewMiddleware.validateReviewExistence,
  reviewController.update
);
router.delete(
  "/:id",
  reviewMiddleware.validateReviewExistence,
  reviewController.delete
);

export default router;
