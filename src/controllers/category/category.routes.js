import express from "express";
import categoryController from "./category.contr.js";
import categoryMiddleware from "./category.middleware.js"; // Adjust the path as necessary
import adminStore_adminMiddleware from "../../middleware/admin&store_admin-middleware.js";


const router = express.Router();
const {
  get,
  getById,
  create,
  update,
  del
} = categoryController;
const { checkToken } = adminStore_adminMiddleware;
const { validateCategoryData } = categoryMiddleware;

router.get("/", get);
router.get("/:id", getById); 
router.post("/", checkToken, validateCategoryData, create);
router.put("/:id", checkToken, validateCategoryData, update);
router.delete("/:id", checkToken, del);

export default router;
