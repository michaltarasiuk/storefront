"use server";

import * as z from "zod";

import {ROUTES} from "#app/consts/routes";
import {signIn} from "#app/modules/account/auth";
import {parseFormData} from "#app/utils/form";
import {joinPathname, PathnameParamsSchema} from "#app/utils/pathname";

export async function signInAction(_state: unknown, formData: FormData) {
  const {email, password, locale, channel} = parseFormData(
    formData,
    FormDataSchema,
  );
  return signIn("saleor", {
    email,
    password,
    redirectTo: joinPathname(locale, channel, ROUTES.account.orders),
  });
}

const FormDataSchema = z.object({
  email: z.email(),
  password: z.string(),
  ...PathnameParamsSchema.shape,
});
