import Order from "../order/order.model.js";
import Deliver from "./deliver.model.js"; 
import bcrypt from "bcrypt";

const deliverController = {
  
  async create(req, res) {
    try {
      const {
        name,
        age,
        description,
        phone,
        password,
        transport_type,
        transport_number,
        metro_lines
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const deliver = new Deliver({
        name,
        age,
        description,
        phone,
        password: hashedPassword,
        transport_type,
        transport_number,
        metro_lines,
      });

      await deliver.save();
      res.status(201).json({ success: true, data: deliver });
    } catch (error) {
      console.error("Error creating deliver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  
  async update(req, res) {
    try {
      const { id } = req.params;
      req.body.password = password
        ? await bcrypt.hash(req.body.password, 10)
        : undefined;
      const updatedDeliver = await Deliver.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedDeliver) {
        return res.status(404).json({ message: "Deliver not found" });
      }

      res.status(200).json({ success: true, data: updatedDeliver });
    } catch (error) {
      console.error("Error updating deliver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  
  async getAll(req, res) {
    try {
      const delivers = await Deliver.find();
      res.status(200).json({ success: true, data: delivers });
    } catch (error) {
      console.error("Error fetching delivers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  
  async getById(req, res) {
    try {
      const { id } = req.params;
      const deliver = await Deliver.findById(id).populate("history");

      if (!deliver) {
        return res.status(404).json({ message: "Deliver not found" });
      }

      res.status(200).json({ success: true, data: deliver });
    } catch (error) {
      console.error("Error fetching deliver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOrders(req, res) {
    try {
      const deliverId = req.deliver._id;
      const { filter } = req.query;

      let matchCriteria = {};
 
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);
      const yesterday = new Date();
      yesterday.setUTCHours(0, 0, 0, 0);
      yesterday.setDate(yesterday.getDate() - 1);
      const endOfToday = new Date();
      endOfToday.setUTCHours(23, 59, 59, 999); 

      if (filter === "today") {
        matchCriteria = {
          createdAt: { $gte: yesterday, $lte: startOfToday },
          status: { $ne: "done" },
        };
      } else if (filter === "tomorrow") {
        matchCriteria = { createdAt: { $gte: startOfToday, $lte: endOfToday } };
      } else if (filter === "done") {
        matchCriteria = { status: "done" };
      } else {
        matchCriteria = {};
      }

      
      const deliver = await Deliver.findById(deliverId).populate({
        path: "history",
        match: matchCriteria,
      });

      res.status(200).json(deliver.history);
    } catch (error) {
      res.status(500).json({ message: "Error fetching deliver orders", error });
    }
  },
};

export default deliverController;
