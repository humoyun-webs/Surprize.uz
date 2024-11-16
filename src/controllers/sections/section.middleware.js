import Joi from "joi";
import Sections from "./sections.model.js";
export default {
  validateSectionsData: async function (req, res, next) {
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
    description_uz: Joi.string().optional(),
    description_ru: Joi.string().optional(),
    products: Joi.array().optional(),
  }),
  PUT: Joi.object({
    name_uz: Joi.string().optional(),
    name_ru: Joi.string().optional(),
    description_uz: Joi.string().optional(),
    description_ru: Joi.string().optional(),
    products: Joi.array().optional(),
  }),
};
