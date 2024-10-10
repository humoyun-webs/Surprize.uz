import express from "express";
import  "../db/globalMongo.js";
import router from "../controllers/index.routes.js";
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodparser from 'body-parser'
// import fileUpload from "";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use("/upload", express.static(`${process.cwd()}/src/public`));
app.use(express.text());
app.use(cors('*'))
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use(express.json()) 
app.use(bodparser.json()) 



app.set('trust proxy', true);
app.use('/api', router);




app.use((error, req, res, next)=>{
  if (error) {
    return res.status(500).json({message: error.message})
  }
  next()
})


app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
