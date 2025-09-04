import type {DeliveryMethod} from "@/graphql/codegen/graphql";

export function isShippingMethod<T extends Partial<DeliveryMethod>>(
  value: T,
): value is Extract<T, {__typename: "ShippingMethod"}> {
  return value.__typename === "ShippingMethod";
}

export function isCollectionPoint<T extends Partial<DeliveryMethod>>(
  value: T,
): value is Extract<T, {__typename: "Warehouse"}> {
  return value.__typename === "Warehouse";
}
