import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  nim: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Users", userSchema);
