import { userService } from "../services/user.service.js";

export const register = async (req, res) => {
  const { email, password, fullname } = req.body;

  try {
    userService.register(email, password, fullname);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    return userService.login(email, password);
  } catch (error) {
    console.log(error);
  }
};
