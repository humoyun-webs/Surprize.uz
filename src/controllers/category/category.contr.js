import Category from "./category.model.js"; // Adjust path as necessary

export default {
  get: async function (req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  },
  getById: async function (req, res) {
    try {
      const category = await Category.findById(req.params.id).populate(
        "products"
      );
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
      const { name_uz, name_ru } = req.body;

      // Check if the category name is unique
      const existingCategory = await Category.findOne({
        $or: [{ "name.uz": name_uz }, { "name.ru": name_ru }],
      });

      if (existingCategory) {
        return res.status(400).json({ error: "Category name must be unique" });
      }

      const newCategory = new Category({
        name: { uz: name_uz, ru: name_ru },
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
      const { name_uz, name_ru } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
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
