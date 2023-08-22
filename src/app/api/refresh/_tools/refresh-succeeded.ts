import {serialize} from 'cookie';

import {createAccessToken} from '@/modules/account/tools/cookies';

export function refreshSucceeded(refreshedAccessToken: string) {
  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': serialize(...createAccessToken(refreshedAccessToken)),
    },
  });
}