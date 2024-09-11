import mongoose from "mongoose";
const { Schema } = mongoose;

const deliverSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number},
    description: { type: String },
    number: { type: String, required: true, unique: true },
    password: { type: String, required: true,},
    transport_type: { type: String, enum: ["car", "walker"], required: true },
    transport_number: { type: String }, // For car transport, might not be used for walkers
    history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order", // Assuming you have an Order model
      },
    ],
  },
  { timestamps: true }
);

const Deliver = mongoose.model("Deliver", deliverSchema);

export default Deliver;
