import { Model, model, Schema } from "mongoose";

const userShema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

export const Users: Model<any> = model("Users", userShema);
