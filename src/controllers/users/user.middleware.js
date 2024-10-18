import Joi from "joi";
import User from "./user.model.js"; // Adjust the path as necessary

// Joi schema for user validation
const userSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(), // Assuming this is a string, could be a phone number
  password: Joi.string().required(), // Password is required
  location: Joi.array().optional(),
  code: Joi.string().optional(),
  birthday: Joi.date().optional(),
  gender: Joi.string().valid("male", "female").optional(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  password: Joi.string().optional(),
  location: Joi.array().optional(),
  birthday: Joi.date().optional(),
  gender: Joi.string().valid("male", "female").optional(),
});

const userMiddleware = {
  // Validate user data using Joi for creation
  async UserPostMD(req, res, next) {
    // Validate the user data with Joi
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the phone number is already in use
    const existingUser = await User.findOne({ phone: req.body.phone });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already in use" });
    }

    next(); // Proceed to the next middleware or controller
  },

  // Validate user data using Joi for updating
  async UserUpdateMD(req, res, next) {
    // Validate the update data with Joi
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({
      phone: req.body.phone,
      _id: { $ne: req.params.id },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already in use" });
    }

    next();
  },
};

export default userMiddleware;
