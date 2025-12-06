import * as z from "zod";

import {CountryCode} from "#app/graphql/codegen/graphql";

export const AddressSchema = z.object({
  country: z.enum(CountryCode),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  streetAddress1: z.string().optional(),
  streetAddress2: z.string().optional(),
  postalCode: z.string().optional(),
  countryArea: z.string().optional(),
  city: z.string().optional(),
  cityArea: z.string().optional(),
});
