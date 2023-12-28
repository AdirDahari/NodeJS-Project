import Joi from "joi";
import { IName, IUser, IAddress, IImage } from "../@types/user";
import { passwordRegex, phoneRegex } from "./patterns";

const schema = Joi.object<IUser>({
  address: Joi.object<IAddress>({
    city: Joi.string().min(2).max(100).required(),
    country: Joi.string().min(2).max(100).required(),
    houseNumber: Joi.number().min(1).max(99999).required(),
    street: Joi.string().min(2).max(100).required(),
    zip: Joi.string().max(20).allow(""),
    state: Joi.string().max(50).allow(""),
  }).required(),
  email: Joi.string().email().min(5).max(100).required(),
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(100).required(),
    last: Joi.string().min(2).max(100).required(),
    middle: Joi.string().max(100).allow(""),
  }).required(),

  password: Joi.string().pattern(passwordRegex).min(5).max(100).required(),
  phone: Joi.string().pattern(phoneRegex).min(5).max(20).required(),
  image: Joi.object<IImage>({
    alt: Joi.string().min(2).max(100).required(),
    url: Joi.string().uri().min(5).max(250).required(),
  }),
  isBusiness: Joi.boolean().required(),
});

export { schema as joiUserSchema };
