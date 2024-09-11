import express from "express";
import storeController from "./stores.contr.js";
import { storeMiddleware } from "./store.middleware.js";
import isAllowed  from "../../middleware/isAllowed.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteStore } = storeController;

let { checkTokenForStore } = isAllowed;
let { checkStoreUpdate } = storeMiddleware;

router.get("/", get);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", checkTokenForStore, checkStoreUpdate, update);
router.delete("/:id", checkTokenForStore, deleteStore);

export default router;
