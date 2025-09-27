import {type FragmentType, useFragment} from "@apollo/client";

import {SkeletonText, Text} from "@/components/Text";
import {graphql} from "@/graphql/codegen";
import type {DeliveryDays_ShippingMethodFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {isDefined} from "@/utils/is-defined";

const DeliveryDays_ShippingMethodFragment = graphql(`
  fragment DeliveryDays_ShippingMethod on ShippingMethod {
    id
    minimumDeliveryDays
    maximumDeliveryDays
  }
`);

interface DeliveryDaysProps extends React.ComponentProps<typeof Text> {
  shippingMethod: FragmentType<DeliveryDays_ShippingMethodFragment>;
}

export function DeliveryDays({shippingMethod, ...props}: DeliveryDaysProps) {
  const {data, complete} = useFragment({
    fragment: DeliveryDays_ShippingMethodFragment,
    from: shippingMethod,
  });
  if (!complete) {
    return <SkeletonText />;
  }
  const {minimumDeliveryDays, maximumDeliveryDays} = data;
  let message: React.ReactNode | undefined;
  if (isDefined(minimumDeliveryDays) && isDefined(maximumDeliveryDays)) {
    message = (
      <FormattedMessage
        id="bHEjjM"
        defaultMessage="{minimumDeliveryDays} to {maximumDeliveryDays} business days"
        values={{
          minimumDeliveryDays,
          maximumDeliveryDays,
        }}
      />
    );
  } else if (isDefined(minimumDeliveryDays)) {
    message = (
      <FormattedMessage
        id="/hIGOi"
        defaultMessage="At least {minimumDeliveryDays} business days"
        values={{
          minimumDeliveryDays,
        }}
      />
    );
  } else if (isDefined(maximumDeliveryDays)) {
    message = (
      <FormattedMessage
        id="CHuzeL"
        defaultMessage="Up to {maximumDeliveryDays} business days"
        values={{
          maximumDeliveryDays,
        }}
      />
    );
  }
  return (
    isDefined(message) && (
      <Text {...props} appearance={props.appearance ?? "subdued"}>
        {message}
      </Text>
    )
  );
}
