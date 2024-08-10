import express from "express";
const router = express.Router(); 

import userRouter from "./users/user.routes.js";
import adminRouter from "./admins/admin.routes.js";
import storeRouter from "./stores/stores.routes.js";
import productRouter from "./products/product.routes.js";




router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/store", storeRouter);
router.use("/product", productRouter);

export default router;
 