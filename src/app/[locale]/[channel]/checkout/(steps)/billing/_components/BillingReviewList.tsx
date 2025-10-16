"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {SkeletonText, Text} from "@/components/Text";
import {Routes} from "@/consts/routes";
import {graphql} from "@/graphql/codegen";
import type {BillingReviewList_CheckoutFragment} from "@/graphql/codegen/graphql";
import {useIntl} from "@/i18n/react-intl";
import {isDefined} from "@/utils/is-defined";

import {
  ReviewItem,
  ReviewList,
  SkeletonReviewItem,
  SkeletonReviewList,
} from "../../_components/ReviewList";

const BillingReviewList_CheckoutFragment = graphql(`
  fragment BillingReviewList_Checkout on Checkout {
    id
    email
  }
`);

interface BillingReviewListProps {
  checkout: FragmentType<BillingReviewList_CheckoutFragment>;
}

export function BillingReviewList({checkout}: BillingReviewListProps) {
  const {data, complete} = useFragment({
    fragment: BillingReviewList_CheckoutFragment,
    from: checkout,
  });
  const intl = useIntl();
  if (!complete) {
    return <SkeletonBillingReviewList />;
  }
  return (
    <ReviewList>
      {isDefined(data.email) && (
        <ReviewItem
          label={intl.formatMessage({
            id: "zFegDD",
            defaultMessage: "Contact",
          })}
          href={Routes.checkout.information}>
          <Text>{data.email}</Text>
        </ReviewItem>
      )}
      <ReviewItem
        label={intl.formatMessage({
          id: "+JsDiH",
          defaultMessage: "Ship to",
        })}
        href={Routes.checkout.information}>
        <SkeletonText />
      </ReviewItem>
      <ReviewItem
        label={intl.formatMessage({
          id: "drqP2L",
          defaultMessage: "Delivery",
        })}
        href={Routes.checkout.delivery}>
        <SkeletonText />
      </ReviewItem>
    </ReviewList>
  );
}

export function SkeletonBillingReviewList() {
  return (
    <SkeletonReviewList>
      <SkeletonReviewItem />
      <SkeletonReviewItem />
      <SkeletonReviewItem />
    </SkeletonReviewList>
  );
}
