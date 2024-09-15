import express from "express";
const router = express.Router(); 

import userRouter from "./users/user.routes.js";
import adminRouter from "./admins/admin.routes.js";
import storeRouter from "./stores/stores.routes.js";
import productRouter from "./products/product.routes.js";
import categoryRouter from "./category/category.routes.js";
import reviewRouter from "./review/review.routes.js";
import generalLogin from "./other/login.js"
import develiverRouter from "./deliver/deliver.routes.js"
import orderRouter from "./order/order.routes.js"


 

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/store", storeRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter); 
router.use("/review", reviewRouter);
router.use("/login", generalLogin);
router.use("/deliver", develiverRouter);
router.use("/order", orderRouter);

router.get("/", (req, res) => {
  res.send(`
    <p>Hey nice to see you, but don't visit <a href="/any">/any</a> invalid path :)</p>
  `);
});

router.use("/*", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});
export default router;
 