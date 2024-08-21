import express from "express";
import productController from "./product.contr.js";
import ProductMiddleware from "./product.middleware.js";
import adminStore_adminMiddleware from "../../middleware/admin&store_admin-middleware.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteProduct } = productController;
let { checkToken } = adminStore_adminMiddleware;
let { PostProductMiddleware,PutProductMiddleware } = ProductMiddleware;

router.get("/", get);
router.get("/:id", getById);
router.post("/", checkToken,PostProductMiddleware, create);
router.put("/:id",checkToken,PutProductMiddleware, update);
router.delete("/:id",checkToken, deleteProduct);

export default router;
