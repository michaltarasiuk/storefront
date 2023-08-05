import type {FormattedExecutionResult} from 'graphql';

import {GRAPHQL_ENDPOINT} from '@/env/env';
import type {TypedDocumentString} from '@/graphql/generated/documents';

import {formatMimeTypes} from '../format-mime-types';
import {isValidResponse} from './is-valid-response';

interface OptionalParams<Variables> {
  readonly operationName?: string | null;
  readonly variables?: Variables | null;
}

export async function fetchGraphQL<Result, Variables>(
  query: TypedDocumentString<Result, Variables>,
  {operationName = null, variables = null}: OptionalParams<Variables> = {},
  init?: Omit<RequestInit, 'method'>,
) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      ...init,
      method: 'POST',
      headers: {
        ...init?.headers,
        'Content-Type': formatMimeTypes(['application/json', 'charset=utf-8']),
        Accept: formatMimeTypes(
          ['application/graphql-response+json', 'charset=utf-8'],
          ['application/json', 'charset=utf-8'],
        ),
      },
      body: JSON.stringify({
        query,
        operationName,
        variables,
      }),
    });

    if (isValidResponse(response)) {
      const {data, errors}: FormattedExecutionResult<Result> =
        await response.json();

      if (data && !errors?.length) {
        return data;
      }
      throw new Error('Something went wrong', {
        cause: errors,
      });
    }
    throw new Error('Invalid response', {
      cause: response,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      console.error(error.cause);
    }
    throw error;
  }
}
