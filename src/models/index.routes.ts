import express from "express";
const router = express.Router();

import userRouter from "./User/user.routes.js";

router.use("/user", userRouter);

export default router;
