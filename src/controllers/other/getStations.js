import express from "express";
import { tashkentMetro } from "../../utils/data.js";

const stationsRouter = express.Router();
stationsRouter.get("/", async (req, res) => { res.json(tashkentMetro);})
  
export default stationsRouter;
