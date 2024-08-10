import express from "express";

// import fileUpload from "";
const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
// app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/src/public`));


app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Hey",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}); 


app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
