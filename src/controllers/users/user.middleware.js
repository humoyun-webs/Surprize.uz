import Joi from "joi";
import User from "./user.model.js"; // Adjust the path as necessary

// Joi schema for user validation
const userSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(), // Assuming this is a string, could be a phone number
  password: Joi.string().required(), // Password is required
  location: Joi.string().optional(),
  code: Joi.string().optional(),
  age: Joi.number().optional(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  number: Joi.string().optional(),
  password: Joi.string().optional(),
  location: Joi.string().optional(),
  age: Joi.number().optional(),
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
    const existingUser = await User.findOne({ number: req.body.number });
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
      number: req.body.number,
      _id: { $ne: req.params.id },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already in use" });
    }

    next();
  },
};

export default userMiddleware;
