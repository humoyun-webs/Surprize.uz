import Order from "./order.model.js";
import Deliver from "../deliver/deliver.model.js";
import User from "../users/user.model.js";
import Product from "../products/product.model.js";
import Store from "../stores/stores.model.js";
import { getLineByStation } from "../../utils/data.js";

const orderController = {
  async createOrder(req, res) {
    try {
      const { products, location, transport_type } = req.body;
      const user_id = req.user.id; // Get user ID from req.user

      // Find user
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find deliverer based on transport type

      // Calculate total price based on products
      let totalPrice = 0;
      for (const productId of products) {
        const product = await Product.findById(productId);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product not found: ${productId}` });
        }
        totalPrice += product.price; // Assuming product has a price field
      }

      let newOrder = new Order({
        products,
        location,
        price: totalPrice,
        user: user_id,
        status: "pending",
      });

      let metroLine = getLineByStation(location);
      let deliver =
        transport_type == "car"
          ? await Deliver.findOne({ transport_type })
          :await orderDivider(metroLine, newOrder._id);

      if (!deliver) {
        return res.status(404).json({
          message: `Deliverer with transport type ${transport_type} not found`,
        });
      }

      newOrder.deliver = deliver._id;
      let savedOrder = await newOrder.save();

      user.orders.push(savedOrder._id);
      await user.save();

      for (const productId of products) {
        const product = await Product.findById(productId);
        if (product) {
          const storeId = product.store;
          let foo = await Store.findById(storeId);
          foo.orders.push(newOrder._id);
          await foo.save();
        }
      }
     (await deliver).history.push(savedOrder._id);
      (await deliver).save();


      res.status(201).json(savedOrder);
    } catch (error) {
      console.log("Error creating order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async ChangeStatus(req, res) {
    try {
      const { status } = req.body;
      let order = await Order.findById(req.params?.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      order.status = status;
      await order.save();
      res.status(201).json({ success: true, data: order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default orderController;

async function orderDivider(line, orderId) {
  const walkers = await Deliver.find({ transport_type:"walker", metro_lines:{$in:[line]} }, { orders: { $slice: -1 } });
  const sortedWalkers = await Promise.all(
    walkers.map(async (walker) => {
      const lastOrder = walker.history.length
        ? await Order.findById(walker.history.at(-1)).select("createdAt")
        : null;
      return {
        walker,
        lastOrderDate: lastOrder ? lastOrder.createdAt : new Date(0),
      };
    })
  );

  sortedWalkers.sort((a, b) => a.lastOrderDate - b.lastOrderDate);
  const selectedWalker = sortedWalkers[0].walker;
  await Deliver.findByIdAndUpdate(selectedWalker._id, {
    $push: { currentOrders: orderId },
  });
  return selectedWalker; 
}
 