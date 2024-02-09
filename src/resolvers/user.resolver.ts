import { z } from "zod";
import { PHONE_REGEX } from "../constants/regex";

export const CreateUserResolver = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 5 caracteres"),
    phone: z.string().regex(PHONE_REGEX, "Telefone em formato inválido"),
  })
  .required();
