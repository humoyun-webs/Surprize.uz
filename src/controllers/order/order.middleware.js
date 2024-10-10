import Joi from "joi";

const orderSchema = Joi.object({
  products: Joi.array().items(Joi.string().required()).required(),
  location: Joi.string().required(),
  transport_type: Joi.string().valid("car", "walker", "fromStore").required(),
});

const orderMiddleware = {
  validateOrderData(req, res, next) {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};

export default orderMiddleware;
