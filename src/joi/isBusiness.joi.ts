import Joi from "joi";
import { IIsBusiness } from "../@types/user";

const schema = Joi.object<IIsBusiness>({
  isBusiness: Joi.boolean().required(),
});

export { schema as joiIsBusiness };
