import {redirect} from 'next/navigation';

import {graphql} from '@/graphql/generated';
import {APP_ROUTES} from '@/lib/consts';
import {cn} from '@/lib/tools/cn';
import {formatPathname} from '@/lib/tools/format-pathname';
import {fetchQueryData} from '@/lib/tools/get-client';
import {raise} from '@/lib/tools/raise';
import {getCheckoutId} from '@/modules/checkout/tools/cookies';

import {Breadcrumbs} from '../_components/breadcrumbs';
import {getRedirectUrl} from '../_tools/get-redirect-url';

const PaymentPage_CheckoutQuery = graphql(/* GraphQL */ `
  query PaymentPage_CheckoutQuery($id: ID!) {
    checkout(id: $id) {
      shippingAddress {
        __typename
      }
      deliveryMethod {
        __typename
      }
      billingAddress {
        __typename
      }
      ...Breadcrumbs_CheckoutFragment
      ...InformationSection_CheckoutFragment
    }
  }
`);

export default async function PaymentPage() {
  const id = getCheckoutId() ?? redirect(formatPathname(APP_ROUTES.ROOT));
  const checkout =
    (
      await fetchQueryData(
        PaymentPage_CheckoutQuery,
        {
          id,
        },
        {
          fetchOptions: {
            cache: 'no-cache',
          },
        },
      )
    ).checkout ?? raise('`checkout` is not defined');

  const redirectUrl = getRedirectUrl(
    checkout,
    formatPathname(...APP_ROUTES.CHECKOUT.PAYMENT),
  );

  if (redirectUrl) {
    redirect(redirectUrl);
  }
  return (
    <div className={cn('space-y-7')}>
      <Breadcrumbs checkout={checkout} />
    </div>
  );
}
