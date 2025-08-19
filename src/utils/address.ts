import * as z from "zod";

import {CountryCode} from "@/graphql/codegen/graphql";

export const AddressSchema = z.object({
  country: z.enum(CountryCode),
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string().optional(),
  streetAddress1: z.string(),
  streetAddress2: z.string().optional(),
  postalCode: z.string(),
  city: z.string(),
});
