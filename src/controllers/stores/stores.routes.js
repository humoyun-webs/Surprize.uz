import express from "express";
import storeController from "./stores.contr.js";
import {storeMiddleware}  from "./store.middleware.js";
const router = express.Router();
let { get, getById, create, update, delete: deleteStore } = storeController;
let { checkToken, checkStoreUpdate } = storeMiddleware;
router.get("/", get);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id",checkToken,checkStoreUpdate, update);
router.delete("/:id",checkToken, deleteStore);

export default router;
