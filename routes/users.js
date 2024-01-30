import express from "express";
import {
  register,
  login,
  getAllUsers,
  logout,
  getLogHistory,
} from "../controllers/userController.js";
import { checkToken } from "../auth/auth.js";
const router = express.Router();

router.get("/", checkToken, getAllUsers);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", checkToken, logout);

router.get("/getLogHistory", checkToken, getLogHistory);
export default router;
