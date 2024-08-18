import JWT from "../utils/jwt.js";
import Admin from "../controllers/admins/admin.model.js"; // Adjust the import path based on your project structure

export default {
  checkToken: async (req, res, next) => {
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
};
