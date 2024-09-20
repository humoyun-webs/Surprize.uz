import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    location: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["in_store", "delivering", "arrived","done"],
      default: "in_store",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliver: {
      type: Schema.Types.ObjectId,
      ref: "Deliver",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
