import { pool } from "../database/index.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const register = async (email, password, fullname) => {
  const user = new UserModel(email, password, fullname);

  if (!user.email || !user.password || !user.fullname) {
    console.log(`Data invalid: ${newUser.email} ${newUser.password}`);
  }

  try {
    if (UserModel.validateEmail(user.email)) {
      console.log("Email is incorrect");
    }

    const [existingUsers] = await pool.query(
      "SELECT * FROM Users WHERE email = ?;",
      [user.email],
    );

    if (existingUsers.length > 0) {
      console.log("Email вже зареєстровано");
    }

    const hashed_password = await bcrypt.hash(user.password, 10);

    const query =
      "insert into users (email, password_hash, fullname) values (?, ?, ?);";

    await pool.query(query, [email, hashed_password, fullname]);

    console.log("User created successfully");

    return { message: "Registration successfull" };
  } catch (error) {
    console.log(error);
  }
};

const login = async (email, password) => {
  if (!email || !password) {
    console.log("Invalid data");
  }

  if (UserModel.validateEmail(email)) {
    console.error("Email is incorrect");
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      console.error("User not found");
    }

    const user = rows[0];

    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatch) {
      console.error("Wrong password");
    }

    const payload = {
      user_id: user.user_id,
      fullname: user.fullname,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log(token);

    console.log("User found, login successful");

    return {
      message: "Login successful",
      token,
      user: payload,
    };
  } catch (error) {
    console.log(error);
  }
};

export const userService = {
  register,
  login,
};
