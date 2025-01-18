import express from "express";
const router = express.Router(); 

import userRouter from "./users/user.routes.js";
import adminRouter from "./admins/admin.routes.js";
import storeRouter from "./stores/stores.routes.js";
import productRouter from "./products/product.routes.js";
import categoryRouter from "./category/category.routes.js";
import subCategoryRouter from "./sub-category/sub-category.routes.js";
import reviewRouter from "./review/review.routes.js";
import generalLogin from "./other/login.js"
import develiverRouter from "./deliver/deliver.routes.js"
import orderRouter from "./order/order.routes.js"
import bannerRouter from "./banner/banner.routes.js"
import sectionRouter from "./sections/section.routes.js";
import stationsRouter from "./other/getStations.js";


 
  

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/store", storeRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter); 
router.use("/sub-category", subCategoryRouter); 
router.use("/review", reviewRouter);
router.use("/login", generalLogin);
router.use("/deliver", develiverRouter);
router.use("/order", orderRouter);
router.use("/banner", bannerRouter);
router.use("/sections", sectionRouter);
router.use("/stations", stationsRouter);

router.get("/", (req, res) => {
  res.send(`
    <p>Hey nice to see you, but don't visit <a href="/any">/any</a> invalid path :)</p>
  `);
});


export default router;
 