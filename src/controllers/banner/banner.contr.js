import { imgUpload } from "../../utils/fileUpload.js";
import Banner from "./banner.model.js";

// Get all banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch banners", error });
  }
};

// Create a new banner
export const createBanner = async (req, res) => {
  try {
    const { url } = req.body;
    const { files: file } = req;
    let imagePath = undefined;
    const newBanner = new Banner({ url });
    //   return

    if (file?.img) {
      imagePath = await imgUpload(file, newBanner._id, "banner");
    }
    newBanner.img = imagePath?.data;
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create banner", error });
  }
};

// Update a banner
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;
    const { files: file } = req;
    let imagePath = undefined;

    const updatedBanner = await Banner.findById(id);
    if (file?.img) {
      imagePath = await imgUpload(file, id, "banner");
    }
    updatedBanner.img = imagePath?.data;
    updatedBanner.url = url;
    await updatedBanner.save();
    res.status(200).json(updatedBanner);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update banner", error });
  }
};

// Delete a banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete banner", error });
  }
};
