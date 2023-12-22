import { Schema } from "mongoose";

import { IUser } from "../../@types/user";
import { nameSchema } from "./name-schema";
import { imageSchema } from "./image-schema";
import { addressSchema } from "./address-schema";

const userSchema = new Schema<IUser>({
  name: nameSchema,
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: {
      alt: "user-profile",
      url: "https://picsum.photos/200/300",
    },
  },
  phone: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    required: true,
    type: String,
    minlength: 5,
    maxlength: 30,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export { userSchema };
