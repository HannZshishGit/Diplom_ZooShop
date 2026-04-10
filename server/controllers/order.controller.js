import { orderService } from "../services/order.service.js";

export const createOrder = async (req, res) => {
  const user_id = req.user.user_id;

  console.log(user_id);

  try {
    orderService.createOrder();
  } catch (error) {
    console.log(error);
  }
};
