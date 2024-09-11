import express from "express";
import categoryController from "./category.contr.js";
import categoryMiddleware from "./category.middleware.js"; // Adjust the path as necessary
import isAllowed from "../../middleware/isAllowed.js";


const router = express.Router();
const {
  get,
  getById,
  create,
  update,
  del
} = categoryController;
const { isAdmin } = isAllowed;
const { validateCategoryData } = categoryMiddleware;

router.get("/", get);
router.get("/:id", getById); 
router.post("/", isAdmin, validateCategoryData, create);
router.put("/:id", isAdmin, validateCategoryData, update);
router.delete("/:id", isAdmin, del);

export default router;
