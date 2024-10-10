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
      enum: ["pending", "in_store", "delivering", "arrived", "done"],
      default: "pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromStore: {
      type: Boolean
    },
    deliver: {
      type: Schema.Types.ObjectId,
      ref: "Deliver"
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
