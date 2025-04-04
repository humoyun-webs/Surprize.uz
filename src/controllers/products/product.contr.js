import { imgUpload } from "../../utils/fileUpload.js";
import Product from "./product.model.js";
import Category from "../category/category.model.js";
export default {
  async get(req, res) {
    try {
      const query = {};

      Object.keys(req.query).forEach((key) => {
        if (key === "minPrice" || key === "maxPrice") {
          query.price = {
            ...query.price,
            ...(key === "minPrice" && { $gte: req.query.minPrice }),
            ...(key === "maxPrice" && { $lte: req.query.maxPrice }),
          };
        } else {
          query[key] = req.query[key];
        }
      });
 
      const products = await Product.find(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to get products" });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("reviews")
        .populate("category")
        .populate("store");
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
        category_id,
        store_id,
        gender,
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
        category: category_id,
        store: store_id,
        count,
        gender,
        id_name,
        price,
      });

      if (file?.images) {
        imagePaths = await imgUpload(file, product._id, "product");
        if (!imagePaths.success)
          return res.status(400).json({ error: imagePaths.error });
      }
      product.images = imagePaths?.data;
      await product.save();

      
        await req.category.updateOne({
        $push: { products: product._id },
        });
      await Category.findOneAndUpdate(
        { subCategories: { $in: [category_id] } },
        { $push: { products: product._id } },
        { new: true }
      );


      await req.store.updateOne({
        $push: { products: product._id },
      });

      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Failed to create product", message: error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        name_uz,
        name_ru,
        price,
        description_uz,
        description_ru,
        category_id,
        store_id,
        gender,
        count,
        id_name,
      } = req.body;

      const { files: file } = req;
      let imagePaths;

      // Find the product by ID
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      // Update product fields dynamically
      const fieldsToUpdate = {
        name_uz: "name.uz",
        name_ru: "name.ru",
        description_uz: "description.uz",
        description_ru: "description.ru",
        category_id: "category",
        store_id: "store",
        count: "count",
        gender:"gender",
        id_name: "id_name",
        price: "price",
      };

      if (product.category !== category_id) {

       await Category.updateOne(
          { _id: product.category },
          { $pull: { products: product._id } }
        );
        await Category.updateOne(
          { _id: category_id },
          { $push: { products: product._id } }
        );
      }

      for (const [key, value] of Object.entries(fieldsToUpdate)) {
        if (req.body[key] !== undefined) {
          product.set(value, req.body[key]);
        }
      }

      if (file?.images) {
        imagePaths = await imgUpload(file, product._id, "product");
        if (!imagePaths.success) {
          return res.status(400).json({ error: imagePaths.error });
        }
        product.images = imagePaths?.data;
      }
 
      await product.save();

      // Update category and store if they exist

      if (req.store) {
        await req.store.updateOne({
          $addToSet: { products: product._id },
        });
      }

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Failed to update product", message: error.message });
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
