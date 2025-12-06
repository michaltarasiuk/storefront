"use server";

import {redirect} from "next/navigation";

import {Routes} from "#app/consts/routes";
import type {Locale} from "#app/i18n/consts";
import {removeSessionCookies} from "#app/modules/account/utils/cookies";
import {joinPathSegments} from "#app/utils/pathname";

export async function logOut(locale: Locale, channel: string) {
  await removeSessionCookies();
  redirect(joinPathSegments(locale, channel, Routes.account.signin));
}
