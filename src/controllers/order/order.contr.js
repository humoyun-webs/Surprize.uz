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
      const user_id = req.user.id;

      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let totalPrice = 0;
      let newOrder = new Order({
        products,
        location,
        user: user_id,
        status: "pending",
      });
      for (const productId of products) {
        const product = await Product.findById(productId);
        if (!product) {
          return res
            .status(404)
            .json({ message: `Product not found: ${productId}` });
        }
        totalPrice += product.price;
        product.count = product.count ? product.count * 1 - 1 : 0;
        const storeId = product.store;
        let foo = await Store.findById(storeId);
        if (!foo) {
          return res.status(404).json({
            message: `Store not found`,
          });
        }
        foo.orders.push(newOrder._id);
        await product.save();
        await foo.save();
      }

       newOrder.price=totalPrice
      
      let metroLine = getLineByStation(location);
      let deliver =
        transport_type == "car"
          ? await Deliver.findOne({ transport_type })
          : await orderDivider(metroLine, newOrder._id);

      if (!deliver) {
        return res.status(404).json({
          message: `Deliverer with transport type ${transport_type} not found`,
        });
      }

      newOrder.deliver = deliver._id;
      let savedOrder = await newOrder.save();

      user.orders.push(savedOrder._id);
      await user.save();

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
  async attachBox(req, res) {
    try {
      const { small, medium, big } = req.body;
      let order = await Order.findById(req.params?.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      let storeAdminId = req.admin.id;
      if (!storeAdminId || !req.admin.store) {
        return res.status(404).json({ error: "This is for Store Admin" });
      }

      let store = await Store.findById(storeAdminId.store);
      let productLength = 0;
      console.log(store);
      // order.products.forEach(
      //   async(e) >
      //     {
      //       if( store.products.incules(e)){
      //         productLength++;
      //       }
      //     }
      // );
      let allBoxCount =
        (small ? small * 1 : 0) +
        (medium ? medium * 1 : 0) +
        (big ? big * 1 : 0);
      if (order.products.length < allBoxCount) {
        return res.status(400).json({
          error:
            "The number of boxes should not be more than that of products.",
        });
      }

      order.boxes.small = small;

      order.boxes.medium = medium;

      order.boxes.big = big;

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
  const walkers = await Deliver.find(
    { transport_type: "walker", metro_lines: { $in: [line] } },
    { orders: { $slice: -1 } }
  );
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
