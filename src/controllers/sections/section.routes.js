import express from "express";
import sectionContr from "./sections.contr.js";
import isAllowed from "../../middleware/isAllowed.js";
import sectionMiddleware from "./section.middleware.js";
const sectionRouter = express.Router();
const { get,getOne, create,addProducts, update, del } = sectionContr;
const { isAdmin } = isAllowed;
let {validateSectionsData }=sectionMiddleware

sectionRouter.get("/", get);
sectionRouter.get("/:id", getOne);
// sectionRouter.get("/all", getMore);
sectionRouter.post("/", isAdmin, validateSectionsData, create);
sectionRouter.post("/addProducts/:id", isAdmin, addProducts);
sectionRouter.put("/:id", isAdmin, validateSectionsData, update);
sectionRouter.delete("/:id", isAdmin, del);

export default sectionRouter;
