import express from "express";
import adminController from "./admin.contr.js";

const router = express.Router();
let { get, getById, create, update, delete: deleteAdmin } = adminController;

router.get("/", get);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteAdmin);

export default router;
