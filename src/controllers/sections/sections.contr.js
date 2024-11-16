import Sections from "./sections.model.js";

export default {
  get: async function (req, res) {
    try {
      const sections = await Sections.find().populate("products");

      res.status(200).json(sections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sections" });
    }
  },
//   get: async function (req, res) {
//     try {
//       const sections = await Sections.find().populate("products");

//       res.status(200).json(sections);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch sections" });
//     }
//   },
  create: async function (req, res) {
    try {
      const { name_uz, name_ru, products, description_uz, description_ru } =
        req.body;

      const newSection = new Sections({
        name: { uz: name_uz, ru: name_ru },
        description: { uz: description_uz, ru: description_ru },

        products: products || [],
      });

      await newSection.save();
      res.status(201).json(newSection);
    } catch (error) {
      res.status(500).json({ error: "Failed to create section" });
    }
  },
  update: async function (req, res) {
    try {
      const { name_uz, name_ru, products, description_uz, description_ru } =
        req.body;
      const updateFields = {};

      if (name_uz) updateFields["name.uz"] = name_uz;
      if (name_ru) updateFields["name.ru"] = name_ru;
      if (description_uz) updateFields["description.uz"] = description_uz;
      if (description_ru) updateFields["description.ru"] = description_ru;
      if (products) updateFields.products = products;

      const updatedSection = await Sections.findByIdAndUpdate(
        req.params.id,
        {
          $set: updateFields,
        },
        { new: true }
      );

      if (!updatedSection) {
        return res.status(404).json({ error: "Section not found" });
      }

      res.status(200).json(updatedSection);
    } catch (error) {
      res.status(500).json({ error: "Failed to update section" });
    }
  },
  addProducts: async function (req, res) {
    try {
      const { products } = req.body;

      const updatedSection = await Sections.findById(req.params.id);
      updatedSection.products = [...updatedSection.products, ...products];
      if (!updatedSection) {
        return res.status(404).json({ error: "Section not found" });
      }

      res.status(200).json(updatedSection);
    } catch (error) {
      res.status(500).json({ error: "Failed to update section" });
    }
  },
  del: async function (req, res) {
    try {
      const deletedSection = await Sections.findByIdAndDelete(req.params.id);
      if (!deletedSection) {
        return res.status(404).json({ error: "Section not found" });
      }

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete section" });
    }
  },
};
 