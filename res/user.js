import User from "../models/User.js";
import { Exceptions } from "../exception/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import LogHistory from "../models/LogHistory.js";
export const loginRes = async ({ username, password }) => {
  let existingUser = await User.findOne({ username: username }).exec();

  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      // create token
      let token = jwt.sign(
        {
          data: {
            id: existingUser._id,
            username: existingUser.username,
          },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1 days",
        }
      );
      const newLogHistory = await LogHistory.create({
        userId: existingUser._id,
        type: "Login",
      });

      return {
        id: existingUser._id,
        username: existingUser.username,

        token: token,
      };
    } else {
      throw new Exceptions("Password is incorrect");
    }
  } else {
    throw new Exceptions("Username is incorrect");
  }
};

export const registerRes = async ({
  username,
  password,
  name,
  phoneNumber,
  address,
}) => {
  try {
    let existingUser = User.findOne({ username }).exec();
    if (!existingUser) {
      throw new Exceptions("User has been registered");
    }
    // // encrypt password, bycryp
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // insert to database
    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Exceptions("Cannot register user");
  }
};
