import Joi from "joi";
import { passwordRegex } from "./patterns";
import { ILogin } from "../@types/user";

const schema = Joi.object<ILogin>({
  email: Joi.string().email().min(5).max(100).required(),
  password: Joi.string().min(5).max(100).pattern(passwordRegex).required(),
});

export { schema as joiLoginSchema };
