import JWT from "../../utils/jwt.js";
import Admin from "./admin.model.js";

export default {
  authenticateAdmin: async (req, res, next) => {
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
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  },
};


