import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  img: { type: String },
  url: { type: String, required: true,},
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
