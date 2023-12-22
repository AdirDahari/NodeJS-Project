import { ICard } from "../../@types/card";
import { Schema } from "mongoose";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";

const cardSchema = new Schema<ICard>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 250,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  web: {
    type: String,
    minlength: 2,
    maxlength: 250,
  },
  address: { type: addressSchema, required: true },
  image: {
    type: imageSchema,
    require: false,
    default: { alt: "card-image", url: "https://picsum.photos/200/300" },
  },
  userId: {
    type: String,
    required: true,
  },
  bizNumber: {
    type: Number,
    required: false,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  likes: [
    {
      type: String,
      required: false,
    },
  ],
});

export { cardSchema };
