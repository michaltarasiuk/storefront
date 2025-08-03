"use server";

import {redirect} from "next/navigation";

import {Routes} from "@/consts/routes";
import type {Locale} from "@/i18n/consts";
import {joinPathSegments} from "@/utils/pathname";
import {removeSessionCookies} from "@/utils/session";

export async function logOut(locale: Locale, channel: string) {
  await removeSessionCookies();
  redirect(joinPathSegments(locale, channel, Routes.signin));
}
