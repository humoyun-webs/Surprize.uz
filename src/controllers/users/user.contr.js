import User from "./user.model.js";
import Joi from "joi"
import dotenv from 'dotenv'


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
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
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

  addFavorite: async (req, res) => {
    try {
      const token = await req.headers["authorization"].split(" ")[1];

      if(!token){
        return res.status(403).json({message:"in this moment have unfortunately event"})
       }
        
       const decoded = await jwt.verify(token, process.env.SECRET_KEY);

       const userId = decoded.user_id
      const { productId } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the product is already in the favorites list
      if (!user.favorite.includes(productId)) {
        user.favorite.push(productId);
        await user.save();
        return res.json({ message: "Product added to favorites", user });
      } else {
        return res.status(400).json({ error: "Product already in favorites" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to add product to favorites" });
    }
  },

  getFavorites: async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the user by ID and populate the favorite products
      const user = await User.findById(userId).populate('favorite');
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Return the list of favorite products
      res.json(user.favorite);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve favorite products" });
    }
  }
};
