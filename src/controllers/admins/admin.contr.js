import Admin from "./admin.model.js";
import JWT from "../../utils/jwt.js"
import bcrypt from "bcrypt";

export default { 
login: async (req, res) => {
    const { phone, password } = req.body;
         
    try {
      const admin = await Admin.findOne({ phone });
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
 
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = JWT.SIGN({ id: admin._id });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },


  async get(req, res) {
    try {
      const admins = await Admin.find()
      if(!admins) return res.status(402).json({message:'Data is not found !'})
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: "Failed to get admins" });
    }
  },
  async getProfile(req, res) {
    try {
      const admins = await Admin.findById(req.admin).populate('store')
      if(!admins) return res.status(402).json({message:'Data is not found !'})
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: "Failed to get admins" });
    }
  },


  async getById(req, res) {
    try {
      const admin = await Admin.findById(req.params.id)
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: "Failed to get admin" });
    }
  },

  addAdmin: async (req, res) => {
    const { name, age, role, contract, phone, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = new Admin({
        name,
        age,
        role,
        contract,
        phone,
        password: hashedPassword
      });

      await admin.save();
        res.status(201).json(admin);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Failed to create admin' });
    }
  },

  async update(req, res) {
    try {
      let { password } = req.body;
      req.body.password = password
        ? await bcrypt.hash(password, 10)
        : undefined;
      const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      console.log(error);
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
