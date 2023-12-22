import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  alt: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  url: {
    type: String,
    minlength: 5,
    maxlength: 250,
    required: true,
  },
});

export { imageSchema };
