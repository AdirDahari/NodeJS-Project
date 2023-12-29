import Joi from "joi";
import { IBizNumber } from "../@types/card";

const schema = Joi.object<IBizNumber>({
  bizNumber: Joi.number().required(),
});

export { schema as joiBizNumber };
