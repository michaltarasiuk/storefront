/* eslint-disable */
import * as types from "./graphql";
import {TypedDocumentNode as DocumentNode} from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n": typeof types.SigninDocument;
  "\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n": typeof types.SignupDocument;
  "\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n": typeof types.AccountValidationErrorFragmentDoc;
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n": typeof types.ConfirmAccountDocument;
  "\n  mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.CheckoutAddPromoCodeDocument;
  "\n  mutation CheckoutEmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.CheckoutEmailUpdateDocument;
  "\n  mutation CheckoutAddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.CheckoutAddressUpdateDocument;
  "\n  mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $shippingMethodId) {\n      errors {\n        ...CheckoutValidationError\n      }\n    }\n  }\n": typeof types.CheckoutShippingMethodUpdateDocument;
  "\n  fragment CheckoutContactSection_Checkout on Checkout {\n    id\n    email\n  }\n": typeof types.CheckoutContactSection_CheckoutFragmentDoc;
  "\n  fragment CheckoutShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n": typeof types.CheckoutShippingAddress_CheckoutFragmentDoc;
  "\n  fragment CheckoutShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n    }\n  }\n": typeof types.CheckoutShippingMethods_CheckoutFragmentDoc;
  "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n": typeof types.CheckoutValidationErrorFragmentDoc;
  "\n  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {\n    checkoutCreate(input: $input) {\n      checkout {\n        id\n      }\n    }\n  }\n": typeof types.DemoCheckoutCreateDocument;
  "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutContactSection_Checkout\n      ...CheckoutShippingAddress_Checkout\n    }\n  }\n": typeof types.CheckoutInformation_CheckoutDocument;
  "\n  query CheckoutPayment_Checkout($id: ID!) {\n    checkout(id: $id) {\n      id\n    }\n  }\n": typeof types.CheckoutPayment_CheckoutDocument;
  "\n  query CheckoutShipping_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutShippingMethods_Checkout\n    }\n  }\n": typeof types.CheckoutShipping_CheckoutDocument;
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n": typeof types.ChannelSlugsDocument;
  "\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n": typeof types.ChannelDocument;
  "\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n": typeof types.AddressFieldset_AddressFragmentDoc;
  "\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n": typeof types.Money_TaxedMoneyFragmentDoc;
};
const documents: Documents = {
  "\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n":
    types.SigninDocument,
  "\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n":
    types.SignupDocument,
  "\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n":
    types.AccountValidationErrorFragmentDoc,
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n":
    types.ConfirmAccountDocument,
  "\n  mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.CheckoutAddPromoCodeDocument,
  "\n  mutation CheckoutEmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.CheckoutEmailUpdateDocument,
  "\n  mutation CheckoutAddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.CheckoutAddressUpdateDocument,
  "\n  mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $shippingMethodId) {\n      errors {\n        ...CheckoutValidationError\n      }\n    }\n  }\n":
    types.CheckoutShippingMethodUpdateDocument,
  "\n  fragment CheckoutContactSection_Checkout on Checkout {\n    id\n    email\n  }\n":
    types.CheckoutContactSection_CheckoutFragmentDoc,
  "\n  fragment CheckoutShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n":
    types.CheckoutShippingAddress_CheckoutFragmentDoc,
  "\n  fragment CheckoutShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n    }\n  }\n":
    types.CheckoutShippingMethods_CheckoutFragmentDoc,
  "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n":
    types.CheckoutValidationErrorFragmentDoc,
  "\n  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {\n    checkoutCreate(input: $input) {\n      checkout {\n        id\n      }\n    }\n  }\n":
    types.DemoCheckoutCreateDocument,
  "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutContactSection_Checkout\n      ...CheckoutShippingAddress_Checkout\n    }\n  }\n":
    types.CheckoutInformation_CheckoutDocument,
  "\n  query CheckoutPayment_Checkout($id: ID!) {\n    checkout(id: $id) {\n      id\n    }\n  }\n":
    types.CheckoutPayment_CheckoutDocument,
  "\n  query CheckoutShipping_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutShippingMethods_Checkout\n    }\n  }\n":
    types.CheckoutShipping_CheckoutDocument,
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n":
    types.ChannelSlugsDocument,
  "\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n":
    types.ChannelDocument,
  "\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n":
    types.AddressFieldset_AddressFragmentDoc,
  "\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n":
    types.Money_TaxedMoneyFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n",
): (typeof documents)["\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CheckoutEmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CheckoutEmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CheckoutAddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CheckoutAddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $shippingMethodId) {\n      errors {\n        ...CheckoutValidationError\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $shippingMethodId) {\n      errors {\n        ...CheckoutValidationError\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutContactSection_Checkout on Checkout {\n    id\n    email\n  }\n",
): (typeof documents)["\n  fragment CheckoutContactSection_Checkout on Checkout {\n    id\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n",
): (typeof documents)["\n  fragment CheckoutShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  fragment CheckoutShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n",
): (typeof documents)["\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {\n    checkoutCreate(input: $input) {\n      checkout {\n        id\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {\n    checkoutCreate(input: $input) {\n      checkout {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutContactSection_Checkout\n      ...CheckoutShippingAddress_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutContactSection_Checkout\n      ...CheckoutShippingAddress_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutPayment_Checkout($id: ID!) {\n    checkout(id: $id) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutPayment_Checkout($id: ID!) {\n    checkout(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutShipping_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutShippingMethods_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutShipping_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutShippingMethods_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n",
): (typeof documents)["\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n",
): (typeof documents)["\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n",
): (typeof documents)["\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
