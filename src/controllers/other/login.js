import User from "../users/user.model.js";
import Admin from "../admins/admin.model.js";
import Deliver from "../deliver/deliver.model.js";
import crypto from "crypto";
import JWT from "../../utils/jwt.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { number, password } = req.body;
    if (!number || !password) {
      return res.status(400).json({ error: "Invalid data" });
    }

    // Check if it's a user
    {//user
      let user = await User.findOne({ number: number });
      let isUser = user
        ? await bcrypt.compare(password, user?.password)
        : false;
      if (user) {
        const token = JWT.SIGN({ id: user._id, role: "user" });
        return res
          .status(200)
          .json({ success: true, token, role: "user", data: user });
      }
    }

    // Check if it's an admin
    {//admin
      let admin = await Admin.findOne({
        phone: number,
      });

      let isAdmin = admin
        ? await bcrypt.compare(password, admin?.password)
        : false;
      if (isAdmin) {
        const token = JWT.SIGN({
          id: admin._id,
          role: "admin",
        });
        return res.status(200).json({
          success: true,
          token,
          role: "admin",
          adminType: admin.role,
          data: admin,
        });
      }
    }

    // Check if it's a deliverer
    {//deliver
      let deliver = await Deliver.findOne({
        phone: number,
      });
      let isDeliver = deliver
        ? await bcrypt.compare(password, deliver?.password)
        : false;

      if (isDeliver) {
        const token = JWT.SIGN({
          id: deliver._id,
          role: "deliver",
        });
        return res.status(200).json({
          success: true,
          token,
          role: "deliver",
          transportType: deliver.transport_type,
          data: deliver,
        });
      }
    }

    // If no match found
    res
      .status(401)
      .json({ success: false, message: "Phone number or password is wrong" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
