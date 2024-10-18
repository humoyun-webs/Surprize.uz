import express from "express";
import reviewController from "./review.contr.js"; // Adjust the path as necessary
import reviewMiddleware from "./review.middleware.js"; // Adjust path as necessary
import { UserAuth } from "../../middleware/auth.js";

const router = express.Router();
let { validateReviewData, validateReviewExistence } = reviewMiddleware;
let { create, getAll, getById, update, delete:del } = reviewController;
// Middleware to validate review data
router.post("/", UserAuth, validateReviewData, create);

router.get("/", getAll);
router.get("/:id", validateReviewExistence, getById);
router.put("/:id", UserAuth, update);
router.delete("/:id", UserAuth, validateReviewExistence, del);

export default router;
