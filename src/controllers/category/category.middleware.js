import Category from "./category.model.js";
 
export default {
  validateCategoryData: async function (req, res, next) {
    try {
      const { name_uz, name_ru } = req.body;

      // Check if required fields are provided
      if (!name_uz || !name_ru) {
        return res
          .status(400)
          .json({ error: "Both name_uz and name_ru are required" });
      }

      // Check if category with the same Uzbek or Russian name already exists
      const existingCategory = await Category.findOne({
        $and: [
          {
            $or: [{ "name.uz": name_uz }, { "name.ru": name_ru }],
          },
          { _id: { $ne: req.params?.id } }, // Exclude the current category
        ],
      });

      if (existingCategory) {
        return res
          .status(400)
          .json({ error: "Category with the same name already exists" });
      }

      // Proceed to the next middleware or route handler if validation passes
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};