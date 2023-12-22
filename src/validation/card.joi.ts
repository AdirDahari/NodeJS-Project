import Joi from "joi";
import { ICard } from "../@types/card";
import { IAddress, IImage } from "../@types/user";
import { phoneRegex } from "./patterns";

const schema = Joi.object<ICard>({
  title: Joi.string().min(2).max(100).required(),
  subtitle: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(250).required(),
  phone: Joi.string().pattern(phoneRegex).min(5).max(20).required(),
  email: Joi.string().email().min(5).max(100).required(),
  web: Joi.string().uri().min(5).max(250),
  address: Joi.object<IAddress>({
    street: Joi.string().min(2).max(100).required(),
    city: Joi.string().min(2).max(100).required(),
    state: Joi.string().min(2).max(100),
    zip: Joi.string().max(20),
    country: Joi.string().min(2).max(100).required(),
    houseNumber: Joi.number().min(1).max(99999).required(),
  }).required(),
  image: Joi.object<IImage>({
    url: Joi.string().uri().min(5).max(250).required(),
    alt: Joi.string().min(2).max(100).required(),
  }),
});

export default schema;
export { schema as joiCardSchema };
