import {GRAPHQL_ENDPOINT} from '@/env/env';
import type {SignUpVariables} from '@/graphql/generated/documents';
import {SignUpDocument} from '@/graphql/generated/documents';
import {Request} from '@/lib/tools/fetch-query';

export function createSignUpRequest(variables: SignUpVariables) {
  return new Request(GRAPHQL_ENDPOINT, {
    params: {
      query: SignUpDocument,
      variables,
    },
  });
}
