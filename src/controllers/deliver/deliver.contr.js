import Deliver from "./deliver.model.js"; // Adjust the path as necessary
import bcrypt from "bcrypt"
const deliverController = {
  // Add a new deliver
  async create(req, res) {

    try {
      const {
        name,
        age,
        description,
        number,
        password,
        transport_type,
        transport_number,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const deliver = new Deliver({
        name,
        age,
        description,
        number,
        password: hashedPassword,
        transport_type,
        transport_number,
      });

      await deliver.save();
      res.status(201).json({ success: true, data: deliver });
    } catch (error) {
      console.error("Error creating deliver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update an existing deliver
  async update(req, res) {
    try {
      const { id } = req.params;
     
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

  // Get all delivers
  async getAll(req, res) {
    try {
      const delivers = await Deliver.find();
      res.status(200).json({ success: true, data: delivers });
    } catch (error) {
      console.error("Error fetching delivers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get deliver by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const deliver = await Deliver.findById(id).populate('history');

      if (!deliver) {
        return res.status(404).json({ message: "Deliver not found" });
      }

      res.status(200).json({ success: true, data: deliver });
    } catch (error) {
      console.error("Error fetching deliver:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default deliverController;
