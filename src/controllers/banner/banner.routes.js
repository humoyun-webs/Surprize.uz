import express from "express";
import isAllowed from "../../middleware/isAllowed.js";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "./banner.contr.js";


let { isAdmin } = isAllowed;
const router = express.Router();

router.get("/", getBanners); // Get all banners
router.post("/", isAdmin, createBanner); // Create a new banner
router.put("/:id", isAdmin, updateBanner); // Update a banner by ID
router.delete("/:id", isAdmin, deleteBanner); // Delete a banner by ID

export default router;
