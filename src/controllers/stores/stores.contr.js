import { imgUpload } from "../../utils/fileUpload.js";
import Store from "./stores.model.js";

export default {
  async getOrders(req, res) {
    try {
      const storeId = req.admin.store;
      if (!storeId) {
      return  res.status(400).json({ message: "This is only for store admins" });
      }

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


     // Fetch the store to get the products array for filtering
     const store = await Store.findById(storeId);

     // Populate orders with matching criteria and filter products within those orders
     const populatedStore = await Store.findById(storeId).populate({
       path: "orders",
       match: matchCriteria,
       populate: {
         path: "products",
         match: { _id: { $in: store.products } },
       },
     });

      res.status(200).json(populatedStore.orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching store orders", error });
    }
  },
  async get(req, res) {
    try {
      const store = await Store.find();

      res.json(store);
    } catch (error) {
      res.status(500).json({ error: "Failed to get store" });
    }
  },
  async getById(req, res) {
    try {
      const store = await Store.findById(req.params.id).populate("products");
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
    const { id } = req.params;
    let {
      name_uz,
      name_ru,
      description_uz,
      description_ru,
      phone,
      location,
      id_name,
    } = req.body;
    const { files: file } = req; // Assuming you're using multer or a similar middleware for file uploads
    let name = { uz: name_uz, ru: name_ru };
    let description = { uz: description_uz, ru: description_ru };

    try {
      const existingStore = await Store.findById(id);
      if (!existingStore) {
        return res.status(404).json({ message: "Store not found" });
      }
      // Handle image upload
      let imagePath = undefined;
      if (file?.image) {
        imagePath = await imgUpload(file, id, "store");
      }

      const updateData = {
        name: {
          uz: name?.uz || existingStore.name?.uz,
          ru: name?.ru || existingStore.name?.ru,
        },
        description: {
          uz: description?.uz || existingStore.description?.uz,
          ru: description?.ru || existingStore.description?.ru,
        },
        phone: phone || existingStore.phone,
        location: location || existingStore.location,
        id_name: id_name || existingStore.id_name,
        ...{ image: imagePath?.data },
      };

      // Find and update the store
      const updatedStore = await Store.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedStore) {
        return res.status(404).json({ message: "Store not found" });
      }

      res.json(updatedStore);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update store" });
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

function parser(jsonString) {
  try {
    // Attempt to parse the JSON string
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    // If parsing fails, handle the error (e.g., log it or return null)
    console.error("Invalid JSON string:", error);
    return null;
  }
}
