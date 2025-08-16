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
  "\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n": typeof types.SigninDocument;
  "\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n": typeof types.SignupDocument;
  "\n  fragment ValidationError on AccountError {\n    field\n    message\n  }\n": typeof types.ValidationErrorFragmentDoc;
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n": typeof types.ConfirmAccountDocument;
  "\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n": typeof types.ContactSection_CheckoutFragmentDoc;
  "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n": typeof types.ShippingAddress_CheckoutFragmentDoc;
  "\n  query CheckoutInformation_Checkout($id: ID!) { \n    checkout(id: $id) {\n      ...ContactSection_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n": typeof types.CheckoutInformation_CheckoutDocument;
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n": typeof types.ChannelSlugsDocument;
  "\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n": typeof types.ChannelDocument;
  "\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n": typeof types.AddressFieldset_AddressFragmentDoc;
  "\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n": typeof types.Money_TaxedMoneyFragmentDoc;
};
const documents: Documents = {
  "\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n":
    types.SigninDocument,
  "\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n":
    types.SignupDocument,
  "\n  fragment ValidationError on AccountError {\n    field\n    message\n  }\n":
    types.ValidationErrorFragmentDoc,
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n":
    types.ConfirmAccountDocument,
  "\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n":
    types.ContactSection_CheckoutFragmentDoc,
  "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n":
    types.ShippingAddress_CheckoutFragmentDoc,
  "\n  query CheckoutInformation_Checkout($id: ID!) { \n    checkout(id: $id) {\n      ...ContactSection_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n":
    types.CheckoutInformation_CheckoutDocument,
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n":
    types.ChannelSlugsDocument,
  "\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n":
    types.ChannelDocument,
  "\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n":
    types.AddressFieldset_AddressFragmentDoc,
  "\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n":
    types.Money_TaxedMoneyFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...ValidationError\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment ValidationError on AccountError {\n    field\n    message\n  }\n",
): (typeof documents)["\n  fragment ValidationError on AccountError {\n    field\n    message\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n",
): (typeof documents)["\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n",
): (typeof documents)["\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFieldset_Address\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query CheckoutInformation_Checkout($id: ID!) { \n    checkout(id: $id) {\n      ...ContactSection_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutInformation_Checkout($id: ID!) { \n    checkout(id: $id) {\n      ...ContactSection_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n",
): (typeof documents)["\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n",
): (typeof documents)["\n  query Channel($slug: String!) {\n    channel(slug: $slug) {\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n",
): (typeof documents)["\n  fragment AddressFieldset_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    streetAddress1\n    streetAddress2\n    postalCode\n    city\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n",
): (typeof documents)["\n  fragment Money_TaxedMoney on TaxedMoney {\n    currency\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
