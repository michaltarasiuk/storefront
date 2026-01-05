import NextAuth, {type User} from "next-auth";
import type {AdapterUser} from "next-auth/adapters";
import type {JWT} from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import * as z from "zod";

import {env} from "#app/env";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {isDefined} from "#app/utils/is-defined";

import {getAccessTokenExpiry} from "./utils/tokens";

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: env.AUTH_SECRET,
  providers: [
    Credentials({
      id: "saleor",
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const parsedCredentials = CredentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }
        const {data} = await getClient().mutate({
          mutation: SignInMutation,
          variables: parsedCredentials.data,
        });
        const {user, token, refreshToken} = data?.tokenCreate ?? {};
        if (!isDefined(user) || !isDefined(token) || !isDefined(refreshToken)) {
          return null;
        }
        return {
          id: user.id,
          token,
          refreshToken,
          accessTokenExpires: getAccessTokenExpiry(token),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}: {token: JWT; user: User | AdapterUser | null}) {
      if (isDefined(user)) {
        token.accessToken = user.token;
      }
      return token;
    },
    session({session, token}) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

const CredentialsSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const SignInMutation = graphql(`
  mutation SignIn($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      user {
        id
      }
      token
      refreshToken
    }
  }
`);

declare module "next-auth" {
  interface User {
    token: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
  interface Session {
    accessToken: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
