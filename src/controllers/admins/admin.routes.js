import express from "express";
import adminController from "./admin.contr.js";
import adminMiddleware from "./admin.middleware.js";
import isAllowed from "../../middleware/isAllowed.js";

const router = express.Router();
let { authenticateAdmin } = adminMiddleware;
let {
  get,
  getProfile,
  getById,
  addAdmin,
  update,
  delete: deleteAdmin,
  login,
} = adminController;
let { checkTokenForStore } = isAllowed;
 
router.get("/",authenticateAdmin, get);
router.get("/profile", checkTokenForStore, getProfile);
router.get("/:id",authenticateAdmin, getById);
router.post("/login", login);
router.post("/",authenticateAdmin, addAdmin);
router.put("/:id",authenticateAdmin, update);
router.delete("/:id",authenticateAdmin, deleteAdmin);

export default router; 
