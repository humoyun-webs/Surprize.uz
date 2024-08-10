import Store from "./stores.model.js";

export default {
  async get(req, res) {
    try {
      const stores = await Store.find().populate("reviews");
      res.json(stores);
    } catch (error) {
      res.status(500).json({ error: "Failed to get stores" });
    }
  },

  async getById(req, res) {
    try {
      const store = await Store.findById(req.params.id).populate("reviews");
      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      res.status(500).json({ error: "Failed to get store" });
    }
  },

  async create(req, res) {
    try {
      const store = new Store(req.body);
      await store.save();
      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ error: "Failed to create store" });
    }
  },

  async update(req, res) {
    try {
      const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate("reviews");
      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      res.status(500).json({ error: "Failed to update store" });
    }
  },

  async delete(req, res) {
    try {
      const store = await Store.findByIdAndDelete(req.params.id);
      if (!store) {
        return res.status(404).json({ error: "Store not found" });
      }
      res.json({ message: "Store deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete store" });
    }
  },
};
