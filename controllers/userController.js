import { loginRes, registerRes } from "../res/user.js";
import { EventEmitter } from "node:events";
import User from "../models/User.js";
import Blocklist from "../models/Blocklist.js";
import LogHistory from "../models/LogHistory.js";
const myEvent = new EventEmitter();

// event register
myEvent.on("event.register.user", (params) => {
  console.log(`they talk about ${JSON.stringify(params)}`);
});
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let existingUser = await loginRes({ username, password });

    res.status(200).json({
      message: "Login successful",
      data: existingUser,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  const { username, password, name, phoneNumber, address } = req.body;
  try {
    // Event Emitted
    myEvent.emit("event.register.user", {
      username,
      name,
      phoneNumber,
      address,
    });
    const user = await registerRes({
      username,
      password,
      name,
      phoneNumber,
      address,
    });
    res.status(200).json(user);
    console.log(user);
  } catch (error) {
    throw new Exceptions("Error registering user");
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error getting users" });
  }
};
export const logout = async (req, res, next) => {
  try {
    const userId = req.userId;
    const token = req.token;
    console.log(userId);

    await Blocklist.create({ token });
    const newLogHistory = await LogHistory.create({
      userId: userId,
      type: "Logout",
    });

    res
      .status(200)
      .json({ success: true, message: "Logout successful", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const getLogHistory = async (req, res, next) => {
  try {
    const userId = req.userId;
    const logHistoriesForUser = await LogHistory.find({
      userId: userId,
    }).sort({ timestamp: -1 });
    res.status(200).json(logHistoriesForUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
