import express from "express";
import productController from "./product.contr.js";
import ProductMiddleware from "./product.middleware.js";
import isAllowed from "../../middleware/isAllowed.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteProduct } = productController;
let { checkTokenForStore } = isAllowed;
let { PostProductMiddleware,PutProductMiddleware } = ProductMiddleware;

router.get("/", get);
router.get("/:id", getById);
router.post("/", checkTokenForStore, PostProductMiddleware, create);
router.put("/:id", checkTokenForStore, PutProductMiddleware, update);
router.delete("/:id", checkTokenForStore, deleteProduct);

export default router;
