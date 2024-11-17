import express from "express";
import orderController from "./order.contr.js";
import Auth from "../../middleware/auth.js"
import orderMiddleware from "./order.middleware.js";
let { createOrder, attachBox } = orderController;

let { UserAuth } = Auth;
let { validateOrderData } = orderMiddleware;

const router = express.Router();

// Route to add a new deliver
router.post("/", UserAuth, validateOrderData, createOrder);
router.put("/attachBox/:id", attachBox);

// // Route to update an existing deliver by ID
// router.put("/:id", isDeliverOrAdmin, putMD, update);

// // Route to get all delivers
// router.get("/", getAll);

// // Route to get a deliver by ID
// router.get("/:id", getById);

export default router;
