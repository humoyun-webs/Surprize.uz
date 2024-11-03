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
      const { name_uz, name_ru, gender, main_category } = req.body;
      const newCategory = new SubCategory({
        name: { uz: name_uz, ru: name_ru },
        gender,
        main_category,
        products: [],
      });

      let mainCat = req.mainCat;
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
      const { name_uz, name_ru, gender, main_category } = req.body;

      const subCategory = await SubCategory.findById(req.params.id);
      if (!subCategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }

      const updateFields = {};
      if (name_uz) updateFields["name.uz"] = name_uz;
      if (name_ru) updateFields["name.ru"] = name_ru;
      if (gender) updateFields.gender = gender;
      if (main_category) updateFields.main_category = main_category;

      const updatedCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        { $set: updateFields },
        { new: true }
      );
      if (
        main_category &&
        main_category !== subCategory.main_category.toString()
      ) {
        await Category.findByIdAndUpdate(subCategory.main_category, {
          $pull: { subCategories: subCategory._id },
        });
        await Category.findByIdAndUpdate(main_category, {
          $push: { subCategories: subCategory._id },
        });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update subcategory" });
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
