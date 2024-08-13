import express from "express";
import storeController from "./stores.contr.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteStore } = storeController;

router.get("/", get);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteStore);

export default router;
