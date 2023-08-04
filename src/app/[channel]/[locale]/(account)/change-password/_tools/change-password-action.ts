'use server';

import {
  ChangePasswordDocument,
  type ChangePasswordVariables,
} from '@/graphql/generated/documents';
import {fetchGraphQL} from '@/lib/tools/fetch-graphql/fetch-graphql';
import {isDefined} from '@/lib/tools/is-defined';

import {logInAction} from '../../_tools/log-in-action';

export async function changePasswordAction(variables: ChangePasswordVariables) {
  const {token, refreshToken, csrfToken, errors} =
    (
      await fetchGraphQL(
        ChangePasswordDocument,
        {
          variables,
        },
        {cache: 'no-cache'},
      )
    ).setPassword ?? {};

  if (errors?.length) {
    return {
      type: 'error' as const,
      value: errors,
    };
  }

  if (!isDefined(token) || !isDefined(refreshToken) || !isDefined(csrfToken)) {
    throw new Error(
      `Missing token. Received: ${{token, refreshToken, csrfToken}}`,
    );
  }

  return {
    type: 'success' as const,
    value: await logInAction({token, refreshToken, csrfToken}),
  };
}