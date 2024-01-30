import mongoose from "mongoose";
import { Exceptions } from "../exception/Exception.js";
export const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect db successfully");
  } catch (error) {
    const { code } = error;
    if (error.code == 8000) {
      throw new Exceptions("Wrong database username or password ");
    } else if (code == "ENOTFOUND") {
      throw new Exceptions("Wrong server string");
    }
    //console.log('error connecting')
  }
};
