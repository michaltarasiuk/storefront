"use server";

import {redirect} from "next/navigation";

import {Routes} from "@/consts/routes";
import type {Locale} from "@/i18n/consts";
import {removeSessionCookies} from "@/modules/account/utils/cookies";
import {joinPathSegments} from "@/utils/pathname";

export async function logOut(locale: Locale, channel: string) {
  await removeSessionCookies();
  redirect(joinPathSegments(locale, channel, Routes.account.signin));
}
