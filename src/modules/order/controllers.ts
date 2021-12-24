import { Order } from "../../entities/order";
import { Request, Response } from "express";
import orderServices from "./services";
import user from "../auth/daos/user";

const createOrder = async (req: Request, res: Response) => {
  const { userId, customerAddress, customerEmail, customerName, customerPhone, paymentMethod, status, deliveryMethod, orderItems } = req.body;

  const orderData: Order = {
    userId,
    customerAddress,
    customerEmail,
    customerName,
    customerPhone,
    paymentMethod,
    status,
    deliveryMethod,
    orderItems,
  };
  const newOrder = await orderServices.createOrder(orderData);
  res.status(200).json({
    status: "success",
    result: newOrder,
  });
};

//admin order
const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await orderServices.getOrderById(Number(id));
  res.status(200).json({
    status: "success",
    result: order,
  });
};
//admin
// const getOrderByUserId = async (req: Request, res: Response) => {
//     const { userId } = req.params;

//     const orders = await orderServices.getOrderByUserId(Number(userId));
//     res.status(200).json({
//         status: "success",
//         result: orders,
//     });
// };
//admin
const adminGetOrders = async (req: Request, res: Response) => {
  let { limit, offset, userId, search } = req.query;
  search = search ? search : "";
  userId = userId ? userId : "-1";

  const orders = await orderServices.getOrders({ pagination: { limit: Number(limit), offset: Number(offset) } }, String(search), Number(userId));

  res.status(200).json({
    status: "success",
    result: orders,
  });
};

//adminOrder
const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await orderServices.deleteOrder(Number(id));
  res.status(200).json({
    status: "success",
    result: order,
  });
};

//User order
const userGetOrders = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const user = req.user;
  const orders = await orderServices.getUserOrders({ pagination: { limit: Number(limit), offset: Number(offset) } }, user);

  res.status(200).json({
    status: "success",
    result: orders,
  });
};

const orderControllers = {
  createOrder,
  getOrderById,
  deleteOrder,
  userGetOrders,
  adminGetOrders,
};

export default orderControllers;
