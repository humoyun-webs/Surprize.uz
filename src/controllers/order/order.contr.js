import Order from "./order.model.js";
import Deliver from "../deliver/deliver.model.js";
import User from "../users/user.model.js";
import Product from "../products/product.model.js";
import Store from "../stores/stores.model.js"
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
      const deliver = await Deliver.findOne({ transport_type });
      if (!deliver) {  
        return res
          .status(404)
          .json({
            message: `Deliverer with transport type ${transport_type} not found`,
          });
      }

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

      // Create the order
      const newOrder = new Order({
        products,
        location,
        price: totalPrice,
        user: user_id,
        deliver: deliver._id,
        status: "pending",
      });

      // Save the order
      const savedOrder = await newOrder.save();

      // Push the order to user's orders
      user.orders.push(savedOrder._id);
      await user.save();

      for (const productId of products) {
        const product = await Product.findById(productId);
        if (product) {
          const storeId = product.store;
          let foo = await Store.findById(storeId)
          foo.orders.push(newOrder._id);
          await foo.save()
        }
      }
      deliver.history.push(savedOrder._id);
      await deliver.save();

      // Push the order to deliver's history if transport type is car
     

      res.status(201).json(savedOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async ChangeStatus(req, res) {
    try {
      const {status} = req.body;
      let order = await Order.findById(req.params?.id)
        if (!order) {
          return res.status(404).json({error:"Order not found"})
      }
        order.status = status
        await order.save()
      res.status(201).json({success:true,data:order});
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },


};

export default orderController;
