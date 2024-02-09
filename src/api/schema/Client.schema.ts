import { z } from "zod";
import { PHONE_REGEX } from "../../constants/regex";

export const clientSchema = z.object({
  name: z.string(),
  phone: z.string().regex(PHONE_REGEX).optional(),
});
