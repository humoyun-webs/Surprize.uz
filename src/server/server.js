import express from "express";
import  "../db/globalMongo.js";
import router from "../models/index.routes.js";

// import fileUpload from "";
const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(router);
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/src/public`));






app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
