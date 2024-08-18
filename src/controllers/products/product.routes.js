import express from "express";
import productController from "./product.contr.js";
import PostProductMiddleware from "./product.middleware.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteProduct } = productController;

router.get("/", get);
router.get("/:id", getById);
router.post("/",PostProductMiddleware, create);
router.put("/:id", update);
router.delete("/:id", deleteProduct);

export default router;
