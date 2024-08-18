import { imgUpload } from "../../utils/fileUpload.js";
import Product from "./product.model.js";

export default {
  async get(req, res) {
    try {
      const products = await Product.find()
        .populate("review")
        .populate("category");
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to get products" });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("review")
        .populate("category");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to get product" });
    }
  },

  async create(req, res) {
  try {
    let {
      name_uz,
      name_ru,
      price,
      description_uz,
      description_ru,
      category,
      count,
      id_name,
    } = req.body;
    
    let { files: file } = req;
    let imagePaths;

    let product = new Product({
      name: { uz: name_uz, ru: name_ru },
      description: {
        uz: description_uz,
        ru: description_ru,
      },
      category,
      count,
      id_name,
      price,
    });

    if (file.images) {
      imagePaths = await imgUpload(file, product._id, "product");
      if(!(imagePaths.success)) return res.status(400).json({error:imagePaths.error});
    }
product.images=imagePaths.data
    await product.save();
    res.status(201).json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create product", message:error });
  }
},

  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .populate("review")
        .populate("category");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  },

  async delete(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
};
