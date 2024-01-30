import { Schema } from "mongoose";
import mongoose from "mongoose";

const Blocklist = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Blocklist", Blocklist);
