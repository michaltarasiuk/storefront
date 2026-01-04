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
  "\n  mutation SignUp($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n": typeof types.SignUpDocument;
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n": typeof types.ConfirmAccountDocument;
  "\n  mutation DeactivateAllTokens {\n    tokensDeactivateAll {\n      __typename\n    }\n  }\n": typeof types.DeactivateAllTokensDocument;
  "\n  mutation AddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.AddPromoCodeDocument;
  "\n  mutation CompleteCheckout($id: ID!) {\n    checkoutComplete(id: $id) {\n      order {\n        id\n      }\n    }\n  }\n": typeof types.CompleteCheckoutDocument;
  "\n  mutation BillingAddressUpdate($id: ID!, $billingAddress: AddressInput!) {\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $billingAddress) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.BillingAddressUpdateDocument;
  "\n  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.DeliveryMethodUpdateDocument;
  "\n  mutation EmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.EmailUpdateDocument;
  "\n  mutation AddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n": typeof types.AddressUpdateDocument;
  "\n  fragment CheckoutSummary_Checkout on Checkout {\n    id\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...CheckoutLines_Checkout\n    ...CheckoutMoneyLines_Checkout\n  }\n": typeof types.CheckoutSummary_CheckoutFragmentDoc;
  "\n  fragment BillingAddress_Checkout on Checkout {\n    id\n    shippingAddress {\n      ...AddressFields_Address\n    }\n    billingAddress {\n      ...AddressFields_Address\n    }\n  }\n": typeof types.BillingAddress_CheckoutFragmentDoc;
  "\n  fragment BillingReviewList_Checkout on Checkout {\n    id\n    email\n  }\n": typeof types.BillingReviewList_CheckoutFragmentDoc;
  "\n  fragment CheckoutBillingForm_Checkout on Checkout {\n    id\n    ...BillingReviewList_Checkout\n    ...BillingAddress_Checkout\n  }\n": typeof types.CheckoutBillingForm_CheckoutFragmentDoc;
  "\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      deliveryMethod {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutBillingForm_Checkout\n    }\n  }\n": typeof types.CheckoutBilling_CheckoutDocument;
  "\n  fragment CheckoutDeliveryForm_Checkout on Checkout {\n    id\n    ...DeliveryReviewList_Checkout\n    ...DeliverySection_Checkout\n  }\n": typeof types.CheckoutDeliveryForm_CheckoutFragmentDoc;
  "\n  fragment DeliveryReviewList_Checkout on Checkout {\n    id\n    email\n  }\n": typeof types.DeliveryReviewList_CheckoutFragmentDoc;
  "\n  fragment DeliverySection_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n": typeof types.DeliverySection_CheckoutFragmentDoc;
  "\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      address {\n        companyName\n      }\n    }\n  }\n": typeof types.CollectionPoints_CheckoutFragmentDoc;
  "\n  fragment DeliveryDays_ShippingMethod on ShippingMethod {\n    id\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n": typeof types.DeliveryDays_ShippingMethodFragmentDoc;
  "\n  fragment ShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money_Money @unmask\n      }\n      ...DeliveryDays_ShippingMethod\n    }\n  }\n": typeof types.ShippingMethods_CheckoutFragmentDoc;
  "\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      shippingAddress {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutDeliveryForm_Checkout\n    }\n  }\n": typeof types.CheckoutDelivery_CheckoutDocument;
  "\n  fragment CheckoutInformationForm_Checkout on Checkout {\n    id\n    ...ContactSection_Checkout\n    ...ShippingAddress_Checkout\n  }\n": typeof types.CheckoutInformationForm_CheckoutFragmentDoc;
  "\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n": typeof types.ContactSection_CheckoutFragmentDoc;
  "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFields_Address\n    }\n  }\n": typeof types.ShippingAddress_CheckoutFragmentDoc;
  "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...CheckoutInformationForm_Checkout\n    }\n  }\n": typeof types.CheckoutInformation_CheckoutDocument;
  "\n  fragment OrderReviewList_Checkout on Checkout {\n    id\n    email\n  }\n": typeof types.OrderReviewList_CheckoutFragmentDoc;
  "\n  query CheckoutReview_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...OrderReviewList_Checkout\n    }\n  }\n": typeof types.CheckoutReview_CheckoutDocument;
  "\n  fragment OrderSummary_Order on Order {\n    id\n    total {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...OrderLines_Order\n    ...OrderMoneyLines_Order\n  }\n": typeof types.OrderSummary_OrderFragmentDoc;
  "\n  query CheckoutOrder_Order($id: ID!) {\n    order(id: $id) {\n      ...OrderSummary_Order\n    }\n  }\n": typeof types.CheckoutOrder_OrderDocument;
  "\n  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {\n    checkoutCreate(input: $input) {\n      checkout {\n        id\n      }\n    }\n  }\n": typeof types.DemoCheckoutCreateDocument;
  "\n  fragment AddressFields_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    phone\n    streetAddress1\n    streetAddress2\n    postalCode\n    countryArea\n    city\n    cityArea\n  }\n": typeof types.AddressFields_AddressFragmentDoc;
  "\n  fragment Money_Money on Money {\n    currency\n    amount\n  }\n": typeof types.Money_MoneyFragmentDoc;
  "\n  fragment ProductThumbnail_Product on Product {\n    id\n    thumbnail {\n      url\n      alt\n    }\n  }\n": typeof types.ProductThumbnail_ProductFragmentDoc;
  "\n  fragment TaxedMoney_TaxedMoney on TaxedMoney {\n    net {\n      ...Money_Money @unmask\n    }\n    gross {\n      ...Money_Money @unmask\n    }\n  }\n": typeof types.TaxedMoney_TaxedMoneyFragmentDoc;
  "\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n    }\n  }\n": typeof types.AddressValidationRulesDocument;
  "\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      user {\n        id\n      }\n      token\n      refreshToken\n    }\n  }\n": typeof types.SignInDocument;
  "\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n": typeof types.AccountValidationErrorFragmentDoc;
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    tokenRefresh(refreshToken: $refreshToken) {\n      token\n    }\n  }\n": typeof types.RefreshAccessTokenDocument;
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n": typeof types.ChannelSlugsDocument;
  "\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n": typeof types.ChannelContextValueDocument;
  "\n  fragment CheckoutLine_Checkout on CheckoutLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n": typeof types.CheckoutLine_CheckoutFragmentDoc;
  "\n  fragment CheckoutLines_Checkout on Checkout {\n    id\n    lines {\n      id\n      ...CheckoutLine_Checkout\n    }\n  }\n": typeof types.CheckoutLines_CheckoutFragmentDoc;
  "\n  fragment CheckoutMoneyLines_Checkout on Checkout {\n    id\n    subtotalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    totalPrice {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n": typeof types.CheckoutMoneyLines_CheckoutFragmentDoc;
  "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n": typeof types.CheckoutValidationErrorFragmentDoc;
  "\n  fragment OrderLine_Order on OrderLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n": typeof types.OrderLine_OrderFragmentDoc;
  "\n  fragment OrderLines_Order on Order {\n    id\n    lines {\n      id\n      ...OrderLine_Order\n    }\n  }\n": typeof types.OrderLines_OrderFragmentDoc;
  "\n  fragment OrderMoneyLines_Order on Order {\n    id\n    subtotal {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    total {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n": typeof types.OrderMoneyLines_OrderFragmentDoc;
};
const documents: Documents = {
  "\n  mutation SignUp($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n":
    types.SignUpDocument,
  "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      user {\n        isActive\n      }\n    }\n  }\n":
    types.ConfirmAccountDocument,
  "\n  mutation DeactivateAllTokens {\n    tokensDeactivateAll {\n      __typename\n    }\n  }\n":
    types.DeactivateAllTokensDocument,
  "\n  mutation AddPromoCode($id: ID!, $promoCode: String!) {\n    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.AddPromoCodeDocument,
  "\n  mutation CompleteCheckout($id: ID!) {\n    checkoutComplete(id: $id) {\n      order {\n        id\n      }\n    }\n  }\n":
    types.CompleteCheckoutDocument,
  "\n  mutation BillingAddressUpdate($id: ID!, $billingAddress: AddressInput!) {\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $billingAddress) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.BillingAddressUpdateDocument,
  "\n  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {\n    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.DeliveryMethodUpdateDocument,
  "\n  mutation EmailUpdate($id: ID!, $email: String!) {\n    checkoutEmailUpdate(id: $id, email: $email) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.EmailUpdateDocument,
  "\n  mutation AddressUpdate($id: ID!, $address: AddressInput!) {\n    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n":
    types.AddressUpdateDocument,
  "\n  fragment CheckoutSummary_Checkout on Checkout {\n    id\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...CheckoutLines_Checkout\n    ...CheckoutMoneyLines_Checkout\n  }\n":
    types.CheckoutSummary_CheckoutFragmentDoc,
  "\n  fragment BillingAddress_Checkout on Checkout {\n    id\n    shippingAddress {\n      ...AddressFields_Address\n    }\n    billingAddress {\n      ...AddressFields_Address\n    }\n  }\n":
    types.BillingAddress_CheckoutFragmentDoc,
  "\n  fragment BillingReviewList_Checkout on Checkout {\n    id\n    email\n  }\n":
    types.BillingReviewList_CheckoutFragmentDoc,
  "\n  fragment CheckoutBillingForm_Checkout on Checkout {\n    id\n    ...BillingReviewList_Checkout\n    ...BillingAddress_Checkout\n  }\n":
    types.CheckoutBillingForm_CheckoutFragmentDoc,
  "\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      deliveryMethod {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutBillingForm_Checkout\n    }\n  }\n":
    types.CheckoutBilling_CheckoutDocument,
  "\n  fragment CheckoutDeliveryForm_Checkout on Checkout {\n    id\n    ...DeliveryReviewList_Checkout\n    ...DeliverySection_Checkout\n  }\n":
    types.CheckoutDeliveryForm_CheckoutFragmentDoc,
  "\n  fragment DeliveryReviewList_Checkout on Checkout {\n    id\n    email\n  }\n":
    types.DeliveryReviewList_CheckoutFragmentDoc,
  "\n  fragment DeliverySection_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n":
    types.DeliverySection_CheckoutFragmentDoc,
  "\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      address {\n        companyName\n      }\n    }\n  }\n":
    types.CollectionPoints_CheckoutFragmentDoc,
  "\n  fragment DeliveryDays_ShippingMethod on ShippingMethod {\n    id\n    minimumDeliveryDays\n    maximumDeliveryDays\n  }\n":
    types.DeliveryDays_ShippingMethodFragmentDoc,
  "\n  fragment ShippingMethods_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        id\n      }\n    }\n    shippingMethods {\n      id\n      name\n      price {\n        ...Money_Money @unmask\n      }\n      ...DeliveryDays_ShippingMethod\n    }\n  }\n":
    types.ShippingMethods_CheckoutFragmentDoc,
  "\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      shippingAddress {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutDeliveryForm_Checkout\n    }\n  }\n":
    types.CheckoutDelivery_CheckoutDocument,
  "\n  fragment CheckoutInformationForm_Checkout on Checkout {\n    id\n    ...ContactSection_Checkout\n    ...ShippingAddress_Checkout\n  }\n":
    types.CheckoutInformationForm_CheckoutFragmentDoc,
  "\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n":
    types.ContactSection_CheckoutFragmentDoc,
  "\n  fragment ShippingAddress_Checkout on Checkout {\n    shippingAddress {\n      ...AddressFields_Address\n    }\n  }\n":
    types.ShippingAddress_CheckoutFragmentDoc,
  "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...CheckoutInformationForm_Checkout\n    }\n  }\n":
    types.CheckoutInformation_CheckoutDocument,
  "\n  fragment OrderReviewList_Checkout on Checkout {\n    id\n    email\n  }\n":
    types.OrderReviewList_CheckoutFragmentDoc,
  "\n  query CheckoutReview_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...OrderReviewList_Checkout\n    }\n  }\n":
    types.CheckoutReview_CheckoutDocument,
  "\n  fragment OrderSummary_Order on Order {\n    id\n    total {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...OrderLines_Order\n    ...OrderMoneyLines_Order\n  }\n":
    types.OrderSummary_OrderFragmentDoc,
  "\n  query CheckoutOrder_Order($id: ID!) {\n    order(id: $id) {\n      ...OrderSummary_Order\n    }\n  }\n":
    types.CheckoutOrder_OrderDocument,
  "\n  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {\n    checkoutCreate(input: $input) {\n      checkout {\n        id\n      }\n    }\n  }\n":
    types.DemoCheckoutCreateDocument,
  "\n  fragment AddressFields_Address on Address {\n    id\n    country {\n      code\n    }\n    firstName\n    lastName\n    companyName\n    phone\n    streetAddress1\n    streetAddress2\n    postalCode\n    countryArea\n    city\n    cityArea\n  }\n":
    types.AddressFields_AddressFragmentDoc,
  "\n  fragment Money_Money on Money {\n    currency\n    amount\n  }\n":
    types.Money_MoneyFragmentDoc,
  "\n  fragment ProductThumbnail_Product on Product {\n    id\n    thumbnail {\n      url\n      alt\n    }\n  }\n":
    types.ProductThumbnail_ProductFragmentDoc,
  "\n  fragment TaxedMoney_TaxedMoney on TaxedMoney {\n    net {\n      ...Money_Money @unmask\n    }\n    gross {\n      ...Money_Money @unmask\n    }\n  }\n":
    types.TaxedMoney_TaxedMoneyFragmentDoc,
  "\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n    }\n  }\n":
    types.AddressValidationRulesDocument,
  "\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      user {\n        id\n      }\n      token\n      refreshToken\n    }\n  }\n":
    types.SignInDocument,
  "\n  fragment AccountValidationError on AccountError {\n    field\n    message\n  }\n":
    types.AccountValidationErrorFragmentDoc,
  "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    tokenRefresh(refreshToken: $refreshToken) {\n      token\n    }\n  }\n":
    types.RefreshAccessTokenDocument,
  "\n  query ChannelSlugs {\n    channels {\n      slug\n      isActive\n    }\n  }\n":
    types.ChannelSlugsDocument,
  "\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n":
    types.ChannelContextValueDocument,
  "\n  fragment CheckoutLine_Checkout on CheckoutLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n":
    types.CheckoutLine_CheckoutFragmentDoc,
  "\n  fragment CheckoutLines_Checkout on Checkout {\n    id\n    lines {\n      id\n      ...CheckoutLine_Checkout\n    }\n  }\n":
    types.CheckoutLines_CheckoutFragmentDoc,
  "\n  fragment CheckoutMoneyLines_Checkout on Checkout {\n    id\n    subtotalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    totalPrice {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n":
    types.CheckoutMoneyLines_CheckoutFragmentDoc,
  "\n  fragment CheckoutValidationError on CheckoutError {\n    field\n    message\n  }\n":
    types.CheckoutValidationErrorFragmentDoc,
  "\n  fragment OrderLine_Order on OrderLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n":
    types.OrderLine_OrderFragmentDoc,
  "\n  fragment OrderLines_Order on Order {\n    id\n    lines {\n      id\n      ...OrderLine_Order\n    }\n  }\n":
    types.OrderLines_OrderFragmentDoc,
  "\n  fragment OrderMoneyLines_Order on Order {\n    id\n    subtotal {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    total {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n":
    types.OrderMoneyLines_OrderFragmentDoc,
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
  source: "\n  mutation SignUp($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation SignUp($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      requiresConfirmation\n      errors {\n        ...AccountValidationError @unmask\n      }\n    }\n  }\n"];
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
  source: "\n  mutation DeactivateAllTokens {\n    tokensDeactivateAll {\n      __typename\n    }\n  }\n",
): (typeof documents)["\n  mutation DeactivateAllTokens {\n    tokensDeactivateAll {\n      __typename\n    }\n  }\n"];
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
  source: "\n  mutation CompleteCheckout($id: ID!) {\n    checkoutComplete(id: $id) {\n      order {\n        id\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CompleteCheckout($id: ID!) {\n    checkoutComplete(id: $id) {\n      order {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation BillingAddressUpdate($id: ID!, $billingAddress: AddressInput!) {\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $billingAddress) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation BillingAddressUpdate($id: ID!, $billingAddress: AddressInput!) {\n    checkoutBillingAddressUpdate(id: $id, billingAddress: $billingAddress) {\n      errors {\n        ...CheckoutValidationError @unmask\n      }\n    }\n  }\n"];
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
  source: "\n  fragment CheckoutSummary_Checkout on Checkout {\n    id\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...CheckoutLines_Checkout\n    ...CheckoutMoneyLines_Checkout\n  }\n",
): (typeof documents)["\n  fragment CheckoutSummary_Checkout on Checkout {\n    id\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...CheckoutLines_Checkout\n    ...CheckoutMoneyLines_Checkout\n  }\n"];
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
  source: "\n  fragment BillingReviewList_Checkout on Checkout {\n    id\n    email\n  }\n",
): (typeof documents)["\n  fragment BillingReviewList_Checkout on Checkout {\n    id\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutBillingForm_Checkout on Checkout {\n    id\n    ...BillingReviewList_Checkout\n    ...BillingAddress_Checkout\n  }\n",
): (typeof documents)["\n  fragment CheckoutBillingForm_Checkout on Checkout {\n    id\n    ...BillingReviewList_Checkout\n    ...BillingAddress_Checkout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      deliveryMethod {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutBillingForm_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutBilling_Checkout($id: ID!) {\n    checkout(id: $id) {\n      deliveryMethod {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutBillingForm_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutDeliveryForm_Checkout on Checkout {\n    id\n    ...DeliveryReviewList_Checkout\n    ...DeliverySection_Checkout\n  }\n",
): (typeof documents)["\n  fragment CheckoutDeliveryForm_Checkout on Checkout {\n    id\n    ...DeliveryReviewList_Checkout\n    ...DeliverySection_Checkout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment DeliveryReviewList_Checkout on Checkout {\n    id\n    email\n  }\n",
): (typeof documents)["\n  fragment DeliveryReviewList_Checkout on Checkout {\n    id\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment DeliverySection_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n",
): (typeof documents)["\n  fragment DeliverySection_Checkout on Checkout {\n    deliveryMethod {\n      __typename\n    }\n    ...ShippingMethods_Checkout\n    ...CollectionPoints_Checkout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      address {\n        companyName\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment CollectionPoints_Checkout on Checkout {\n    id\n    deliveryMethod {\n      __typename\n      ... on Warehouse {\n        id\n      }\n    }\n    availableCollectionPoints {\n      id\n      address {\n        companyName\n      }\n    }\n  }\n"];
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
  source: "\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      shippingAddress {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutDeliveryForm_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutDelivery_Checkout($id: ID!) {\n    checkout(id: $id) {\n      shippingAddress {\n        __typename\n      }\n      ...CheckoutSummary_Checkout\n      ...CheckoutDeliveryForm_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutInformationForm_Checkout on Checkout {\n    id\n    ...ContactSection_Checkout\n    ...ShippingAddress_Checkout\n  }\n",
): (typeof documents)["\n  fragment CheckoutInformationForm_Checkout on Checkout {\n    id\n    ...ContactSection_Checkout\n    ...ShippingAddress_Checkout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n",
): (typeof documents)["\n  fragment ContactSection_Checkout on Checkout {\n    id\n    email\n  }\n"];
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
  source: "\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...CheckoutInformationForm_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutInformation_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...CheckoutInformationForm_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment OrderReviewList_Checkout on Checkout {\n    id\n    email\n  }\n",
): (typeof documents)["\n  fragment OrderReviewList_Checkout on Checkout {\n    id\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutReview_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...OrderReviewList_Checkout\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutReview_Checkout($id: ID!) {\n    checkout(id: $id) {\n      ...CheckoutSummary_Checkout\n      ...OrderReviewList_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment OrderSummary_Order on Order {\n    id\n    total {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...OrderLines_Order\n    ...OrderMoneyLines_Order\n  }\n",
): (typeof documents)["\n  fragment OrderSummary_Order on Order {\n    id\n    total {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    ...OrderLines_Order\n    ...OrderMoneyLines_Order\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query CheckoutOrder_Order($id: ID!) {\n    order(id: $id) {\n      ...OrderSummary_Order\n    }\n  }\n",
): (typeof documents)["\n  query CheckoutOrder_Order($id: ID!) {\n    order(id: $id) {\n      ...OrderSummary_Order\n    }\n  }\n"];
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
  source: "\n  fragment ProductThumbnail_Product on Product {\n    id\n    thumbnail {\n      url\n      alt\n    }\n  }\n",
): (typeof documents)["\n  fragment ProductThumbnail_Product on Product {\n    id\n    thumbnail {\n      url\n      alt\n    }\n  }\n"];
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
  source: "\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n    }\n  }\n",
): (typeof documents)["\n  query AddressValidationRules($countryCode: CountryCode!) {\n    addressValidationRules(countryCode: $countryCode) {\n      allowedFields\n      requiredFields\n      upperFields\n      countryAreaChoices {\n        raw\n        verbose\n      }\n      cityChoices {\n        raw\n        verbose\n      }\n      cityAreaChoices {\n        raw\n        verbose\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      user {\n        id\n      }\n      token\n      refreshToken\n    }\n  }\n",
): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      user {\n        id\n      }\n      token\n      refreshToken\n    }\n  }\n"];
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
  source: "\n  mutation RefreshAccessToken($refreshToken: String!) {\n    tokenRefresh(refreshToken: $refreshToken) {\n      token\n    }\n  }\n",
): (typeof documents)["\n  mutation RefreshAccessToken($refreshToken: String!) {\n    tokenRefresh(refreshToken: $refreshToken) {\n      token\n    }\n  }\n"];
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
  source: "\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ChannelContextValue($slug: String!) {\n    channel(slug: $slug) {\n      countries {\n        code\n        country\n      }\n      taxConfiguration {\n        displayGrossPrices\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutLine_Checkout on CheckoutLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n",
): (typeof documents)["\n  fragment CheckoutLine_Checkout on CheckoutLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutLines_Checkout on Checkout {\n    id\n    lines {\n      id\n      ...CheckoutLine_Checkout\n    }\n  }\n",
): (typeof documents)["\n  fragment CheckoutLines_Checkout on Checkout {\n    id\n    lines {\n      id\n      ...CheckoutLine_Checkout\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment CheckoutMoneyLines_Checkout on Checkout {\n    id\n    subtotalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    totalPrice {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n",
): (typeof documents)["\n  fragment CheckoutMoneyLines_Checkout on Checkout {\n    id\n    subtotalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    totalPrice {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n"];
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
  source: "\n  fragment OrderLine_Order on OrderLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n",
): (typeof documents)["\n  fragment OrderLine_Order on OrderLine {\n    id\n    quantity\n    variant {\n      product {\n        name\n        ...ProductThumbnail_Product\n      }\n    }\n    totalPrice {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment OrderLines_Order on Order {\n    id\n    lines {\n      id\n      ...OrderLine_Order\n    }\n  }\n",
): (typeof documents)["\n  fragment OrderLines_Order on Order {\n    id\n    lines {\n      id\n      ...OrderLine_Order\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment OrderMoneyLines_Order on Order {\n    id\n    subtotal {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    total {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n",
): (typeof documents)["\n  fragment OrderMoneyLines_Order on Order {\n    id\n    subtotal {\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n    deliveryMethod {\n      __typename\n      ... on ShippingMethod {\n        price {\n          ...Money_Money @unmask\n        }\n      }\n    }\n    total {\n      tax {\n        ...Money_Money @unmask\n      }\n      ...TaxedMoney_TaxedMoney @unmask\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
