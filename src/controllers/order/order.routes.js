import express from "express";
import orderController from "./order.contr.js";
import Auth from "../../middleware/auth.js"
let { createOrder } = orderController;
let { UserAuth } = Auth;

const router = express.Router();

// Route to add a new deliver
router.post("/",UserAuth, createOrder);

// // Route to update an existing deliver by ID
// router.put("/:id", isDeliverOrAdmin, putMD, update);

// // Route to get all delivers
// router.get("/", getAll);

// // Route to get a deliver by ID
// router.get("/:id", getById);

export default router;
