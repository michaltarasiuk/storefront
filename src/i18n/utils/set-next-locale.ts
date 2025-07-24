"use server";

import {cookies} from "next/headers";

import {type Locale, NextLocaleCookieName} from "../consts";

export async function setNextLocaleCookie(value: Locale) {
  (await cookies()).set({
    name: NextLocaleCookieName,
    value,
  });
}
