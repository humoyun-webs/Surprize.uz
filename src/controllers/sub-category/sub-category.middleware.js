import Category from "../category/category.model.js";
import Joi from "joi";

export default {
  validateCategoryData: async function (req, res, next) {
    try {
      let JOIschema = schemas[req.method];
      const { error } = JOIschema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      let mainCat = await Category.findById(req.body.main_category);
      if (!mainCat) {
        return res.status(404).json({ error: "Main Category not found" });
      }
      req.mainCat = mainCat;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

let schemas = {
  POST: Joi.object({
    name_uz: Joi.string().required(),
    name_ru: Joi.string().required(),
    main_category: Joi.string().required(),
    gender: Joi.array()
      .items(Joi.string().valid("male", "female", "kids"))
      .min(1)
      .required(),
  }),
  PUT: Joi.object({
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    main_category: Joi.string(),
    gender: Joi.array()
      .items(Joi.string().valid("male", "female", "kids"))
      .min(1),
  }),
};
