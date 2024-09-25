import express from "express";
import deliverController from "./deliver.contr.js"; // Adjust the path as necessary
import isAllowed from "../../middleware/isAllowed.js";
import deliverMiddleware from "./deliver.middleware.js";

let { create, update, getAll, getById,getOrders } = deliverController;
let { isAdmin, isDeliverOrAdmin } = isAllowed;
let { validateDeliverData: postMD, validateDeliverUpdate: putMD } =
  deliverMiddleware;
const router = express.Router();

// Route to add a new deliver
router.post("/", isAdmin, postMD, create);

// Route to update an existing deliver by ID
router.put("/:id", isDeliverOrAdmin, putMD, update);

// Route to get all delivers
router.get("/", getAll);
router.get("/orders",isDeliverOrAdmin, getOrders);

// Route to get a deliver by ID
router.get("/:id", getById);

export default router;
