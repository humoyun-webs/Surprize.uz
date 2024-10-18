import mongoose from "mongoose";
const { Schema } = mongoose;

const deliverSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    description: { type: String },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    transport_type: { type: String, enum: ["car", "walker"], required: true },
    transport_number: { type: String },
    metro_lines: {
      type: [String],
      enum: ["Chilanzar", "Uzbekistan", "Unusabad","Qoyliq"],
      validate: [arrayLimit, "{PATH} exceeds the limit of 3"],
    },
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);
function arrayLimit(val) {
  return val.length <= 4; // Optional: Limit the number of items in the array
}

const Deliver = mongoose.model("Deliver", deliverSchema);

export default Deliver;
