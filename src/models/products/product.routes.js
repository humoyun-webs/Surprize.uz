import express from "express";
import productController from "./product.contr.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteProduct } = productController;

router.get("/", get);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteProduct);

export default router;
