'use server';

import invariant from 'tiny-invariant';

import type {LogInVariables} from '@/graphql/generated/documents';
import {CSRF_TOKEN_NAME} from '@/modules/account/consts';
import {setAccessToken, setRefreshToken} from '@/modules/account/tools/cookies';

import {logIn} from './log-in';

export async function logInAction(variables: LogInVariables) {
  const {tokenCreate} = await logIn(variables);
  const {token, refreshToken, csrfToken, errors} = tokenCreate ?? {};

  if (errors?.length) {
    return {
      type: 'error' as const,
      result: errors,
    };
  }
  invariant(token && refreshToken && csrfToken, 'Missing token');

  await setAccessToken(token);
  setRefreshToken(refreshToken);

  return {
    type: 'success' as const,
    result: {name: CSRF_TOKEN_NAME, value: csrfToken},
  };
}