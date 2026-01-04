"use server";

import {ROUTES} from "#app/consts/routes";
import type {Locale} from "#app/i18n/consts";
import {signOut} from "#app/modules/account/auth";
import {joinPathname} from "#app/utils/pathname";

export async function signOutAction(locale: Locale, channel: string) {
  return signOut({
    redirectTo: joinPathname(locale, channel, ROUTES.auth.signin),
  });
}
