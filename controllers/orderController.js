const Order = require("../models/orderModel");
const User = require("../models/userModel");

const exception = (e) => {
  return {
    error: "An error occurred!",
    data: e,
  };
};

const orderController = {
  get: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate({ path: "items", populate: { path: "product" } })
        .populate("customer");
      res
        .status(200)
        .json({ message: "Gel all orders successfully!", data: orders });
    } catch (e) {
      res.status(500).json(exception(e));
    }
  },

  getById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate({ path: "items", populate: { path: "product" } })
        .populate("customer");
      res.status(200).json({ message: "Get order successfully", data: order });
    } catch (e) {
      res.status(500).json(exception(e));
    }
  },

  create: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const order = await newOrder.save();
      const user = await User.findById(req.body.customer);
      await user.updateOne({ $push: { orders: order._id } });
      res
        .status(201)
        .json({ message: "Create order successfully!", data: order });
    } catch (e) {
      res.status(500).json(exception(e));
    }
  },

  update: async (req, res) => {
    try {
      await Order.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({ message: "Update order successfully!", data: "" });
    } catch (e) {
      res.status(500).json(exception(e));
    }
  },

  delete: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Delete order successfully!", data: "" });
    } catch (e) {
      res.status(500).json(exception(e));
    }
  },
};

module.exports = orderController;
