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
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n": typeof types.ConfirmAccountDocument;
  "\n  mutation AddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.AddPromoCodeDocument;
  "\n  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.DeliveryMethodUpdateDocument;
  "\n  mutation EmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.EmailUpdateDocument;
  "\n  mutation AddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.AddressUpdateDocument;
  "\n  fragment BillingAddress_Checkout on Checkout {\n    id\n    shippingAddress {\n      ...AddressFields_Address\n    }\n    billingAddress {\n      ...AddressFields_Address\n    }\n  }\n": typeof types.BillingAddress_CheckoutFragmentDoc;
  "\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...BillingAddress_Checkout\n    }\n  }\n": typeof types.CheckoutBilling_CheckoutDocument;
  "\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      name\n    }\n  }\n": typeof types.CollectionPoints_CheckoutFragmentDoc;
  "\n  fragment Delivery_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n": typeof types.Delivery_CheckoutFragmentDoc;
  "\n  fragment DeliveryDays_ShippingMethod on ShippingMethod {\n    id\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n": typeof types.DeliveryDays_ShippingMethodFragmentDoc;
  "\n  fragment ShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money_Money @unmask\n      }\n      ...DeliveryDays_ShippingMethod\n    }\n  }\n": typeof types.ShippingMethods_CheckoutFragmentDoc;
  "\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Delivery_Checkout\n    }\n  }\n": typeof types.CheckoutDelivery_CheckoutDocument;
  "\n  fragment Contact_Checkout on Checkout {\n    id\n    email\n  }\n": typeof types.Contact_CheckoutFragmentDoc;
  "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFields_Address\n    }\n  }\n": typeof types.ShippingAddress_CheckoutFragmentDoc;
  "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Contact_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n": typeof types.CheckoutInformation_CheckoutDocument;
  "\n  fragment AddressFields_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    phone\n    streetAddress1\n    streetAddress2\n    postalCode\n    countryArea\n    city\n    cityArea\n  }\n": typeof types.AddressFields_AddressFragmentDoc;
  "\n  fragment Money_Money on Money {\n    currency\n    amount\n  }\n": typeof types.Money_MoneyFragmentDoc;
  "\n  fragment TaxedMoney_TaxedMoney on TaxedMoney {\n    net {\n      ...Money_Money @unmask\n    }\n    gross {\n      ...Money_Money @unmask\n    }\n  }\n": typeof types.TaxedMoney_TaxedMoneyFragmentDoc;
  "\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n      postalCodeExamples\n    }\n  }\n": typeof types.AddressValidationRulesDocument;
  "\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n": typeof types.AccountValidationErrorFragmentDoc;
  "\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n": typeof types.ChannelContextValueDocument;
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n": typeof types.ChannelSlugsDocument;
  "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n": typeof types.CheckoutValidationErrorFragmentDoc;
};
const documents: Documents = {
  "\n  mutation Signin($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n":
    types.SigninDocument,
  "\n  mutation Signup($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n":
    types.SignupDocument,
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n":
    types.ConfirmAccountDocument,
  "\n  mutation AddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.AddPromoCodeDocument,
  "\n  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.DeliveryMethodUpdateDocument,
  "\n  mutation EmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.EmailUpdateDocument,
  "\n  mutation AddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.AddressUpdateDocument,
  "\n  fragment BillingAddress_Checkout on Checkout {\n    id\n    shippingAddress {\n      ...AddressFields_Address\n    }\n    billingAddress {\n      ...AddressFields_Address\n    }\n  }\n":
    types.BillingAddress_CheckoutFragmentDoc,
  "\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...BillingAddress_Checkout\n    }\n  }\n":
    types.CheckoutBilling_CheckoutDocument,
  "\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      name\n    }\n  }\n":
    types.CollectionPoints_CheckoutFragmentDoc,
  "\n  fragment Delivery_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n":
    types.Delivery_CheckoutFragmentDoc,
  "\n  fragment DeliveryDays_ShippingMethod on ShippingMethod {\n    id\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n":
    types.DeliveryDays_ShippingMethodFragmentDoc,
  "\n  fragment ShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money_Money @unmask\n      }\n      ...DeliveryDays_ShippingMethod\n    }\n  }\n":
    types.ShippingMethods_CheckoutFragmentDoc,
  "\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Delivery_Checkout\n    }\n  }\n":
    types.CheckoutDelivery_CheckoutDocument,
  "\n  fragment Contact_Checkout on Checkout {\n    id\n    email\n  }\n":
    types.Contact_CheckoutFragmentDoc,
  "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFields_Address\n    }\n  }\n":
    types.ShippingAddress_CheckoutFragmentDoc,
  "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Contact_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n":
    types.CheckoutInformation_CheckoutDocument,
  "\n  fragment AddressFields_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    phone\n    streetAddress1\n    streetAddress2\n    postalCode\n    countryArea\n    city\n    cityArea\n  }\n":
    types.AddressFields_AddressFragmentDoc,
  "\n  fragment Money_Money on Money {\n    currency\n    amount\n  }\n":
    types.Money_MoneyFragmentDoc,
  "\n  fragment TaxedMoney_TaxedMoney on TaxedMoney {\n    net {\n      ...Money_Money @unmask\n    }\n    gross {\n      ...Money_Money @unmask\n    }\n  }\n":
    types.TaxedMoney_TaxedMoneyFragmentDoc,
  "\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n      postalCodeExamples\n    }\n  }\n":
    types.AddressValidationRulesDocument,
  "\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n":
    types.AccountValidationErrorFragmentDoc,
  "\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n":
    types.ChannelContextValueDocument,
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n":
    types.ChannelSlugsDocument,
  "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n":
    types.CheckoutValidationErrorFragmentDoc,
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
  source: "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation AddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation EmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation EmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation AddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BillingAddress_Checkout on Checkout {\n    id\n    shippingAddress {\n      ...AddressFields_Address\n    }\n    billingAddress {\n      ...AddressFields_Address\n    }\n  }\n",
): (typeof documents)["\n  fragment BillingAddress_Checkout on Checkout {\n    id\n    shippingAddress {\n      ...AddressFields_Address\n    }\n    billingAddress {\n      ...AddressFields_Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...BillingAddress_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...BillingAddress_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment Delivery_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n",
): (typeof documents)["\n  fragment Delivery_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment DeliveryDays_ShippingMethod on ShippingMethod {\n    id\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n",
): (typeof documents)["\n  fragment DeliveryDays_ShippingMethod on ShippingMethod {\n    id\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money_Money @unmask\n      }\n      ...DeliveryDays_ShippingMethod\n    }\n  }\n",
): (typeof documents)["\n  fragment ShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money_Money @unmask\n      }\n      ...DeliveryDays_ShippingMethod\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Delivery_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Delivery_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment Contact_Checkout on Checkout {\n    id\n    email\n  }\n",
): (typeof documents)["\n  fragment Contact_Checkout on Checkout {\n    id\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFields_Address\n    }\n  }\n",
): (typeof documents)["\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFields_Address\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Contact_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...Contact_Checkout\n      ...ShippingAddress_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AddressFields_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    phone\n    streetAddress1\n    streetAddress2\n    postalCode\n    countryArea\n    city\n    cityArea\n  }\n",
): (typeof documents)["\n  fragment AddressFields_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    phone\n    streetAddress1\n    streetAddress2\n    postalCode\n    countryArea\n    city\n    cityArea\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment Money_Money on Money {\n    currency\n    amount\n  }\n",
): (typeof documents)["\n  fragment Money_Money on Money {\n    currency\n    amount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TaxedMoney_TaxedMoney on TaxedMoney {\n    net {\n      ...Money_Money @unmask\n    }\n    gross {\n      ...Money_Money @unmask\n    }\n  }\n",
): (typeof documents)["\n  fragment TaxedMoney_TaxedMoney on TaxedMoney {\n    net {\n      ...Money_Money @unmask\n    }\n    gross {\n      ...Money_Money @unmask\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n      postalCodeExamples\n    }\n  }\n",
): (typeof documents)["\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n      postalCodeExamples\n    }\n  }\n"];
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
  source: "\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n"];
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
  source: "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n",
): (typeof documents)["\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
