import Category from "../category/category.model.js";
import SubCategory from "./sub-category.model.js"; // Adjust path as necessary

export default {
  get: async function (req, res) {
    try {
      const categories = await SubCategory.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sub-categories" });
    }
  },
  getById: async function (req, res) {
    try {
      const category = await SubCategory.findById(req.params.id).populate(
        "products"
      );
      if (!category) {
        return res.status(404).json({ error: "Sub-category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sub-category" });
    }
  },
  create: async function (req, res) {
    try {
      const { name_uz, name_ru, main_category } = req.body;

      const existingCategory = await SubCategory.findOne({
        $or: [{ "name.uz": name_uz }, { "name.ru": name_ru }],
      });

      if (existingCategory) {
        return res.status(400).json({ error: "Category name must be unique" });
      }

      const newCategory = new SubCategory({
        name: { uz: name_uz, ru: name_ru },
        products: [],
      });
      let mainCat = await Category.findById(main_category);
      if (!mainCat) {
        return res.status(404).json({ error: "Main Category not found" });
      }
      mainCat.subCategories.push(newCategory._id);
      await newCategory.save();
      await mainCat.save();

      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: "Failed to create category" });
    }
  },
  update: async function (req, res) {
    try {
      const { name_uz, name_ru, main_category } = req.body;

      const updatedCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: { uz: name_uz, ru: name_ru },
          },
        },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: "Failed to update category" });
    }
  },
  del: async function (req, res) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  },
};
