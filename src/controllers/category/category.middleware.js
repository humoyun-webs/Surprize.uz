import Category from "./category.model.js";
import Joi from "joi";

export default {
  validateCategoryData: async function (req, res, next) {
    try {
      let JOIschema = schemas[req.method];
      const { error } = JOIschema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
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
    gender: Joi.array()
      .items(Joi.string().valid("male", "female", "kids"))
      .min(1)
      .required(),
  }),
  PUT: Joi.object({
    name_uz: Joi.string(),
    name_ru: Joi.string(),
    gender: Joi.array()
      .items(Joi.string().valid("male", "female", "kids"))
      .min(1),
  }),
};
