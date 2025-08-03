import "server-only";

import jwt from "jsonwebtoken";
import {cookies} from "next/headers";
import {z} from "zod";

const CookieNames = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

const AccessTokenPayloadSchema = z.object({
  type: z.literal("access"),
  exp: z.number(),
});

const RefreshTokenPayloadSchema = z.object({
  type: z.literal("refresh"),
  exp: z.number(),
});

export async function getAccessToken() {
  return (await cookies()).get(CookieNames.accessToken);
}

export async function getRefreshToken() {
  return (await cookies()).get(CookieNames.refreshToken);
}

export async function setAccessTokenCookie(token: string) {
  const decoded = jwt.decode(token);
  const payload = AccessTokenPayloadSchema.parse(decoded);

  (await cookies()).set(CookieNames.accessToken, token, {
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    expires: new Date(payload.exp * 1_000),
  });
}

export async function setRefreshTokenCookie(token: string) {
  const decoded = jwt.decode(token);
  const payload = RefreshTokenPayloadSchema.parse(decoded);

  (await cookies()).set(CookieNames.refreshToken, token, {
    sameSite: "strict",
    httpOnly: true,
    secure: true,
    expires: new Date(payload.exp * 1_000),
  });
}

export async function removeSessionCookies() {
  const requestCookies = await cookies();
  requestCookies.delete(CookieNames.accessToken);
  requestCookies.delete(CookieNames.refreshToken);
}
