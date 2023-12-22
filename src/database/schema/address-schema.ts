import { Schema } from "mongoose";
import { IAddress } from "../../@types/user";

const addressSchema = new Schema<IAddress>({
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 250,
  },

  state: {
    type: String,
    required: false,
    default: "",
    minlength: 0,
    maxlength: 100,
  },

  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  street: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },

  zip: {
    type: String,
    required: false,
    default: "0",
    maxlength: 20,
  },

  houseNumber: {
    type: Number,
    required: true,
    min: 0,
    max: 99999,
  },
});

export { addressSchema };
