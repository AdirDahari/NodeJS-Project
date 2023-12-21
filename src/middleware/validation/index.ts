import { joiCardSchema } from "../../validation/card.joi";
import { joiIsBusiness } from "../../validation/isBusiness.joi";
import { joiLoginSchema } from "../../validation/login.joi";
import { joiUserSchema } from "../../validation/user.joi";
import { validateSchema } from "./validate-schema";

export const validateRegistration = validateSchema(joiUserSchema);
export const validateLogin = validateSchema(joiLoginSchema);
export const validateCard = validateSchema(joiCardSchema);
export const validateIsBusiness = validateSchema(joiIsBusiness);
