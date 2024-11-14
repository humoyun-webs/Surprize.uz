import SubCategory from "../sub-category/sub-category.model.js";
import Category from "./category.model.js"; 

export default {
  get: async function (req, res) {
    try {
      const categories = await Category.find().populate("subCategories");
      const groupedCategories = categories.reduce((acc, category) => {
        category.gender.forEach((gender) => {
          if (!acc[gender]) {
            acc[gender] = [];
          }

          const subCategoriesForGender = category.subCategories.filter(
            (subCategory) => subCategory.gender.includes(gender)
          );

          const categoryWithFilteredSubcategories = {
            ...category.toObject(),
            subCategories: subCategoriesForGender,
          };

          if (
            subCategoriesForGender.length > 0 ||
            category.gender.includes(gender)
          ) {
            acc[gender].push(categoryWithFilteredSubcategories);
          }
        });

        return acc;
      }, {});

      res.status(200).json(groupedCategories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  },
  getById: async function (req, res) {
    try {
      const category = await Category.findById(req.params.id)
        .populate("subCategories")
        .populate("products");
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  },
  create: async function (req, res) {
    try {
      const { name_uz, name_ru, gender } = req.body;

      const newCategory = new Category({
        name: { uz: name_uz, ru: name_ru },
        gender,
        products: [],
      });

      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: "Failed to create category" });
    }
  },
  update: async function (req, res) {
    try {
      const { name_uz, name_ru, gender } = req.body;
      const updateFields = {};

      if (name_uz) updateFields["name.uz"] = name_uz;
      if (name_ru) updateFields["name.ru"] = name_ru;
      if (gender) updateFields.gender = gender;

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: updateFields,
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
      deletedCategory.subCategories?.forEach(async (e) => {
        await SubCategory.findByIdAndDelete(e);
      });
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  },
};
