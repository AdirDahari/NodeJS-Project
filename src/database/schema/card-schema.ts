import { ICard } from "../../@types/card";
import { Schema } from "mongoose";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";

const cardSchema = new Schema<ICard>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  web: { type: String },
  address: { type: addressSchema, required: true },
  image: {
    type: imageSchema,
    require: false,
    default: { alt: "card-image", url: "https://picsum.photos/200/300" },
  },
  userId: { type: String, required: true },
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
