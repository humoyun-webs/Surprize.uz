import User from "./user.model.js";
import Joi from "joi";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import {
  setRedisData,
  getRedisData,
  deleteRedisData,
} from "../../db/redistGlobal.js";
import { generateCode } from "../../utils/generateCode.js";
import JWT from "../../utils/jwt.js";

export default {
  get: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to get users" });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  },

  create: async (req, res) => {
    try {
      const { name, age, location, password, phone: number, code } = req.body;

      if (!code) {
        const generatedConfirmationCode = generateCode();
        await setRedisData(number, generatedConfirmationCode);

        return res.status(201).json({
          success: true,
          code: generatedConfirmationCode,
          error: "Confirmation code sent to the phone number",
        });
      }
      if (code !== (await getRedisData(number))) {
        return res.status(400).json({
          error:
            "The confirmation code you entered is incorrect. Please try again.",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
      const user = await User.create(req.body);

      let token = JWT.SIGN({ id: user.id });
      res.status(201).json({
        token,
        data: user,
      });

      await deleteRedisData(number);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { phone, password } = req.body;

      // Find user by phone number
      const user = await User.findOne({ phone });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid phone number or password" });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid phone number or password" });
      }

      // Generate a JWT token
      const token = JWT.SIGN({ id: user._id });

      res.status(200).json({
        success: true,
        token,
        data: user,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      let { password } = req.body;
      req.body.password = password
        ? await bcrypt.hash(password, 10)
        : undefined;
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  },

  toggleFavorite: async (req, res) => {
    try {
      const { productId } = req.body;
      const user = req.user;

      // Check if the product is already in the user's favorites
      const isFavorite = user.favorite.includes(productId);

      if (isFavorite) {
        // If it's already a favorite, remove it
        user.favorite.pull(productId);
        await user.save();
        res.status(200).json({ message: "Product removed from favorites" });
      } else {
        // If it's not a favorite, add it
        user.favorite.push(productId);
        await user.save();
        res.status(200).json({ message: "Product added to favorites" });
      }
    } catch (error) {
      console.error("Error toggling favorite product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getFavorites: async (req, res) => {
    try {
      const userId = req.id;

      // Find the user by ID and populate the favorite products
      const user = await User.findById(userId).populate("favorite");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Return the list of favorite products
      res.json(user.favorite);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve favorite products" });
    }
  },
  getOrders: async (req, res) => {
    try {
      const userId = req.id;

      const user = await User.findById(userId).populate("orders");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user.orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve orders" });
    }
  },
};
