
import Joi from "joi";
import JWT from "../../utils/jwt.js";
import Admin from "../admins/admin.model.js"; // Adjust the import path based on your project structure
import Store from "./stores.model.js";

export const storeMiddleware = {
    checkToken: async (req, res, next) => {
        const token = req.headers.token;
        const editingStoreId = req.params?.id
        if (!token) {
            return res.status(403).json({ message: "Forbidden" });
        }

        try {
            const decoded = JWT.VERIFY(token);
            const admin = await Admin.findById(decoded.id);

            if (!admin) {
                return res.status(403).json({ message: "Forbidden" });
            }

            const isAdmin = admin.role === "admin";
            const hasStore = admin.store == editingStoreId;

            if (isAdmin || hasStore) {
                req.admin = admin;
                next();
            } else {
                return res.status(403).json({ message: "Forbidden" });
            }
        } catch (error) {
            return res.status(403).json({ message: "Forbidden" });
        }
    },

    checkStoreUpdate: async (req, res, next) => {
      
      try {
        // Validate the request body using the Joi schema

        const { error } = updateStoreSchema.validate(req.body, {
          abortEarly: false,
        });
        if (error) {
          const errors = error.details.map((err) => ({
            message: err.message,
            path: err.path.join("."),
          }));
          return res.status(400).json({ errors });
        }

        const { id_name, phone } = req.body;
        const { id } = req.params;

        // Check if id_name is unique
        if (id_name) {
          const existingStore = await Store.findOne({
            id_name,
            _id: { $ne: id },
          });
          if (existingStore) {
            return res
              .status(409)
              .json({
                message: `The id_name "${id_name}" is already in use by another store.`,
              });
          }
        }

        // Check if phone is unique
        if (phone) {
          const existingStore = await Store.findOne({
            phone,
            _id: { $ne: id },
          });
          if (existingStore) {
            return res
              .status(409)
              .json({
                message: `The phone number "${phone}" is already in use by another store.`,
              });
          }
        }

        next(); // Proceed to the next middleware or controller
      } catch (err) {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }
    }
}
const updateStoreSchema = Joi.object({
  name_uz: Joi.string(),
  name_ru: Joi.string(),

  description_uz: Joi.string(),
  description_ru: Joi.string(),

  id_name: Joi.string()
    .pattern(/^[a-zA-Z0-9-]+$/)
    .min(3)
    .max(50)
    .optional(),
  // Unique id_name based on Uzbek name

  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      "string.pattern.base": "Phone number should be between 10 and 15 digits.",
    }), // Phone number with a basic pattern

  location: Joi.string(), // Location
});




