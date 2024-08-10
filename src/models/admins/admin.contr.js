import Admin from "./admin.model.js";

export default {
  async get(req, res) {
    try {
      const admins = await Admin.find().populate("contract");
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: "Failed to get admins" });
    }
  },

  async getById(req, res) {
    try {
      const admin = await Admin.findById(req.params.id).populate("contract");
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: "Failed to get admin" });
    }
  },

  async create(req, res) {
    try {
      const admin = new Admin(req.body);
      await admin.save();
      res.status(201).json(admin);
    } catch (error) {
      res.status(500).json({ error: "Failed to create admin" });
    }
  },

  async update(req, res) {
    try {
      const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate("contract");
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: "Failed to update admin" });
    }
  },

  async delete(req, res) {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json({ message: "Admin deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete admin" });
    }
  },
};
