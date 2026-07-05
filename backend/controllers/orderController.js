const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const io = req.app.get("io");
    if (io) {
      const populatedOrder = await Order.findById(order._id).populate("user", "name email");
      io.emit("newOrder", populatedOrder);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status;
    const updatedOrder = await order.save();
    
    const io = req.app.get("io");
    if (io) {
      io.emit("orderStatusUpdated", await Order.findById(updatedOrder._id).populate("user", "name email"));
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.deleteOne();
    
    const io = req.app.get("io");
    if (io) {
      io.emit("orderDeleted", req.params.id);
    }

    res.json({ message: "Order removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.body.shippingAddress) {
      order.shippingAddress = {
        ...order.shippingAddress,
        ...req.body.shippingAddress
      };
    }
    
    if (req.body.paymentMethod) order.paymentMethod = req.body.paymentMethod;

    const updatedOrder = await order.save();
    
    const io = req.app.get("io");
    if (io) {
      io.emit("orderDetailsUpdated", await Order.findById(updatedOrder._id).populate("user", "name email"));
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder, updateOrderDetails };