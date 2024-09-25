import JWT from "../utils/jwt.js";
import Admin from "../controllers/admins/admin.model.js"; // Adjust the import path based on your project structure
import Deliver from "../controllers/deliver/deliver.model.js";

export default {
  checkTokenForStore: async (req, res, next) => {
    const token = req.headers.token;
    const editingStoreId = req.params?.id;
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
  isAdmin: async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({ error: "Forbidden" });
    }

    try {
      const decoded = JWT.VERIFY(token);
      const admin = await Admin.findById(decoded.id);

      if (!admin || admin.role !== "admin") {
        return res.status(403).json({ error: "Forbidden" });
      }

      req.admin = admin;
      req.user = admin;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  },
  isDeliverOrAdmin: async (req, res, next) => {
    const token = req.headers.token;
    const editingDeliverId = req.params?.id;
    if (!token) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    try {
      const decoded = JWT.VERIFY(token);
      const admin = await Admin.findById(decoded.id);
      const deliver = await Deliver.findById(decoded.id);
      
      if (!admin && !deliver) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const isAdmin = admin?.role === "admin";
      let isCorrectDeliver = true
      if(editingDeliverId) isCorrectDeliver = deliver.id == editingDeliverId;
      
      if (isAdmin || isCorrectDeliver) {
        req.admin = admin;
        req.deliver = deliver;
        next();
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Forbidden" });
    }
  },
};
