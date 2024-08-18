import express from "express";
import productController from "./product.contr.js";
import PostProductMiddleware from "./product.middleware.js";
import adminStore_adminMiddleware from "../../middleware/admin&store_admin-middleware.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteProduct } = productController;
let { checkToken } = adminStore_adminMiddleware;

router.get("/", get);
router.get("/:id", getById);
router.post("/", checkToken,PostProductMiddleware, create);
router.put("/:id",checkToken, update);
router.delete("/:id",checkToken, deleteProduct);

export default router;
