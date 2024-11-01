import SubCategory from "./sub-category.model.js";

export default {
  validateCategoryData: async function (req, res, next) {
    try {
      const { name_uz, name_ru } = req.body;

      if (!name_uz || !name_ru) {
        return res
          .status(400)
          .json({ error: "Both name_uz and name_ru are required" });
      }

      const existingCategory = await SubCategory.findOne({
        $and: [
          {
            $or: [{ "name.uz": name_uz }, { "name.ru": name_ru }],
          },
          { _id: { $ne: req.params?.id } },
        ],
      });

      if (existingCategory) {
        return res
          .status(400)
          .json({ error: "SubCategory with the same name already exists" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
