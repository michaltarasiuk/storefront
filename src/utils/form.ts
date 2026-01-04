import type * as z from "zod";

export function parseFormData<T>(formData: FormData, schema: z.ZodType<T>) {
  const formDataObject = Object.fromEntries(formData);
  return schema.parse(formDataObject);
}
