import Joi from "joi";
import Deliver from "./deliver.model.js";

// Joi schema for deliver validation
const deliverSchema = Joi.object({
  name: Joi.string().required(),
  transport_type: Joi.string().valid("car", "walker").required(),
  number: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi.number().optional(),
  description: Joi.string().optional(),
  transport_number: Joi.string().optional(),
});
const deliverSchemaUpdate = Joi.object({
  name: Joi.string().optional(),
  transport_type: Joi.string().valid("car", "walker").optional(),
  number: Joi.string().optional(),
  password: Joi.string().optional(),
  age: Joi.number().optional(),
  description: Joi.string().optional(),
  transport_number: Joi.string().optional(),
});

const deliverMiddleware = {
  // Validate deliver data using Joi for POST request
  async validateDeliverData(req, res, next) {
    // Validate the deliver data with Joi
    const { error } = deliverSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
         const existingDeliver = await Deliver.findOne({
           number: req.body.number
         });
         if (existingDeliver) {
           return res
             .status(409)
             .json({ message: "Phone number already in use" });
         }
        
    next(); // Proceed to the next middleware or controller
  },
  async validateDeliverUpdate(req, res, next) {
    // Validate the deliver data with Joi
    const { error } = deliverSchemaUpdate.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
         const existingDeliver = await Deliver.findOne({
           number: req.body.number,
           _id: { $ne: req.params.id },
         });
         if (existingDeliver) {
           return res
             .status(409)
             .json({ message: "Phone number already in use" });
         }
        
    next(); // Proceed to the next middleware or controller
  },
};

export default deliverMiddleware;