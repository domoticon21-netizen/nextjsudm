import * as z from "zod";

export const bandSchemma = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export const bandArray = z.array(bandSchemma).min(1);