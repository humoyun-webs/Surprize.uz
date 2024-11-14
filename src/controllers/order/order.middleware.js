import Joi from "joi";
import { tashkentMetro } from "../../utils/data.js";
const metroStations = Object.values(tashkentMetro).flat();
const orderSchema = Joi.object({
  products: Joi.array().items(Joi.string().required()).required(),
  location: Joi.alternatives().conditional("transport_type", {
    is: "car",
    then: Joi.string(),
    otherwise: Joi.string()
      .valid(...metroStations)
      .required()
      .messages({
        "any.only": "For walker, location must be one of the metro stations",
      }),
  }),
  transport_type: Joi.string().valid("car", "walker").required(),
  box: Joi.string().valid("standart", "premium").required(),
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
