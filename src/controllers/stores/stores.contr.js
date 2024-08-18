import { imgUpload } from "../../utils/fileUpload.js";
import Store from "./stores.model.js";

export default {
  async get(req, res) {
    try {
      const stores = await Store.find()
        // .populate("reviews");
      res.json(stores);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to get stores" });
    }
  }, 

  async getById(req, res) {
    try {
      const store = await Store.findById(req.params.id)
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

  async update(req, res){
     
    const { id } = req.params;
    let { name_uz,name_ru, description_uz,description_ru, phone, location, reviews, products ,id_name } = req.body;
    const { files:file } = req; // Assuming you're using multer or a similar middleware for file uploads
let name ={uz:name_uz,ru:name_ru}
    let description = { uz: description_uz, ru: description_ru }
    
    try { 
       const existingStore = await Store.findById(id);
       if (!existingStore) {
         return res.status(404).json({ message: "Store not found" });
       }
      // Handle image upload
      let imagePath = undefined;
      if (file.image) {
        imagePath = await imgUpload(file, id, 'store');  // 'store' type for image upload
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
        ...(imagePath && { image: imagePath }), // Add image path only if it's updated
      };

      // Find and update the store
      const updatedStore = await Store.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!updatedStore) {
        return res.status(404).json({ message: 'Store not found' });
      }

      res.json(updatedStore);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update store' });
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
