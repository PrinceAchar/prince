const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID!;

// --- Discovery ---

interface OpenIDConfig {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
  jwks_uri: string;
}

interface ApiConfig {
  graphql_api: string;
}

export async function discoverAuthEndpoints(): Promise<OpenIDConfig> {
  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/.well-known/openid-configuration`
  );
  if (!res.ok) throw new Error(`Failed to discover auth endpoints: ${res.status}`);
  return res.json();
}

export async function discoverApiEndpoint(): Promise<string> {
  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/.well-known/customer-account-api`
  );
  if (!res.ok) throw new Error(`Failed to discover API endpoint: ${res.status}`);
  const config: ApiConfig = await res.json();
  return config.graphql_api;
}

// --- Token Exchange ---

interface TokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

export async function exchangeCodeForAccessToken(
  code: string,
  codeVerifier: string,
  redirectUri: string
): Promise<TokenResponse> {
  const config = await discoverAuthEndpoints();

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    code,
    code_verifier: codeVerifier,
  });

  const res = await fetch(config.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<Omit<TokenResponse, "id_token">> {
  const config = await discoverAuthEndpoints();

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    refresh_token: refreshToken,
  });

  const res = await fetch(config.token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${text}`);
  }

  return res.json();
}

// --- GraphQL Client ---

function formatAccessToken(token: string): string {
  return token.startsWith("shcat_") ? token : `shcat_${token}`;
}

export async function customerAccountFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  accessToken?: string
): Promise<T> {
  const graphqlEndpoint = await discoverApiEndpoint();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = formatAccessToken(accessToken);
  }

  const res = await fetch(graphqlEndpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Customer Account API error: ${res.status} ${res.statusText} - ${text.slice(0, 500)}`
    );
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(
      json.errors.map((e: { message: string }) => e.message).join("\n")
    );
  }

  return json.data;
}

// --- Customer Queries ---

export interface CustomerData {
  customer: {
    firstName: string;
    lastName: string;
    emailAddress: { emailAddress: string };
    phoneNumber: { phoneNumber: string } | null;
    orders: {
      edges: {
        node: {
          id: string;
          number: number;
          processedAt: string;
          financialStatus: string;
          fulfillments: {
            nodes: {
              status: string;
            }[];
          };
          totalPrice: {
            amount: string;
            currencyCode: string;
          };
          lineItems: {
            edges: {
              node: {
                title: string;
                quantity: number;
                price: {
                  amount: string;
                  currencyCode: string;
                };
                image: {
                  url: string;
                  altText: string | null;
                } | null;
              };
            }[];
          };
        };
      }[];
    };
    addresses: {
      edges: {
        node: {
          id: string;
          firstName: string;
          lastName: string;
          address1: string;
          address2: string | null;
          city: string;
          zoneCode: string | null;
          zip: string | null;
          territoryCode: string | null;
          phoneNumber: string | null;
        };
      }[];
    };
    defaultAddress: { id: string } | null;
  };
}

export const CUSTOMER_QUERY = `
  query Customer {
    customer {
      firstName
      lastName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      orders(first: 20) {
        edges {
          node {
            id
            number
            processedAt
            financialStatus
            fulfillments(first: 1) {
              nodes {
                status
              }
            }
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            address1
            address2
            city
            zoneCode
            zip
            territoryCode
            phoneNumber
          }
        }
      }
      defaultAddress {
        id
      }
    }
  }
`;

export const ORDER_QUERY = `
  query Order($id: ID!) {
    order(id: $id) {
      id
      name
      number
      processedAt
      financialStatus
      fulfillmentStatus
      statusPageUrl
      subtotal {
        amount
        currencyCode
      }
      totalShipping {
        amount
        currencyCode
      }
      totalTax {
        amount
        currencyCode
      }
      totalPrice {
        amount
        currencyCode
      }
      shippingAddress {
        id
        firstName
        lastName
        address1
        address2
        city
        zoneCode
        zip
        territoryCode
        phoneNumber
      }
      lineItems(first: 20) {
        edges {
          node {
            title
            quantity
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export interface OrderData {
  order: {
    id: string;
    name: string;
    number: number;
    processedAt: string;
    financialStatus: string;
    fulfillmentStatus: string;
    statusPageUrl: string;
    subtotal: { amount: string; currencyCode: string } | null;
    totalShipping: { amount: string; currencyCode: string };
    totalTax: { amount: string; currencyCode: string } | null;
    totalPrice: { amount: string; currencyCode: string };
    shippingAddress: {
      id: string;
      firstName: string;
      lastName: string;
      address1: string;
      address2: string | null;
      city: string;
      zoneCode: string | null;
      zip: string | null;
      territoryCode: string | null;
      phoneNumber: string | null;
    } | null;
    lineItems: {
      edges: {
        node: {
          title: string;
          quantity: number;
          price: { amount: string; currencyCode: string };
          image: { url: string; altText: string | null } | null;
        };
      }[];
    };
  } | null;
}

export async function getOrder(
  accessToken: string,
  id: string
): Promise<OrderData["order"]> {
  const data = await customerAccountFetch<OrderData>(ORDER_QUERY, { id }, accessToken);
  return data.order;
}

export async function getCustomer(
  accessToken: string
): Promise<CustomerData["customer"] | null> {
  try {
    return await getCustomerOrThrow(accessToken);
  } catch {
    return null;
  }
}

export async function getCustomerOrThrow(
  accessToken: string
): Promise<CustomerData["customer"]> {
  const data = await customerAccountFetch<CustomerData>(CUSTOMER_QUERY, undefined, accessToken);
  return data.customer;
}

// --- Customer Mutations ---

const CUSTOMER_UPDATE_MUTATION = `
  mutation CustomerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        firstName
        lastName
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function updateCustomerName(
  accessToken: string,
  firstName: string,
  lastName: string
): Promise<{ customer: { firstName: string; lastName: string } | null; errors: string[] }> {
  const data = await customerAccountFetch<{
    customerUpdate: {
      customer: { firstName: string; lastName: string } | null;
      userErrors: { field: string; message: string }[];
    };
  }>(CUSTOMER_UPDATE_MUTATION, { input: { firstName, lastName } }, accessToken);

  return {
    customer: data.customerUpdate.customer,
    errors: data.customerUpdate.userErrors.map((e) => e.message),
  };
}

// --- Address Mutations ---

const CUSTOMER_ADDRESS_CREATE_MUTATION = `
  mutation CustomerAddressCreate($address: CustomerAddressInput!, $defaultAddress: Boolean) {
    customerAddressCreate(address: $address, defaultAddress: $defaultAddress) {
      customerAddress {
        id
        firstName
        lastName
        address1
        address2
        city
        zoneCode
        zip
        territoryCode
        phoneNumber
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_ADDRESS_UPDATE_MUTATION = `
  mutation CustomerAddressUpdate($addressId: ID!, $address: CustomerAddressInput, $defaultAddress: Boolean) {
    customerAddressUpdate(addressId: $addressId, address: $address, defaultAddress: $defaultAddress) {
      customerAddress {
        id
        firstName
        lastName
        address1
        address2
        city
        zoneCode
        zip
        territoryCode
        phoneNumber
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CUSTOMER_ADDRESS_DELETE_MUTATION = `
  mutation CustomerAddressDelete($id: ID!) {
    customerAddressDelete(id: $id) {
      deletedAddressId
      userErrors {
        field
        message
      }
    }
  }
`;

export interface AddressInput {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zoneCode?: string;
  zip?: string;
  territoryCode?: string;
  phoneNumber?: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  zoneCode: string | null;
  zip: string | null;
  territoryCode: string | null;
  phoneNumber: string | null;
}

export async function createAddress(
  accessToken: string,
  address: AddressInput,
  defaultAddress = false
): Promise<{ address: Address | null; errors: string[] }> {
  const data = await customerAccountFetch<{
    customerAddressCreate: {
      customerAddress: Address | null;
      userErrors: { field: string; message: string }[];
    };
  }>(CUSTOMER_ADDRESS_CREATE_MUTATION, { address, defaultAddress }, accessToken);

  return {
    address: data.customerAddressCreate.customerAddress,
    errors: data.customerAddressCreate.userErrors.map((e) => e.message),
  };
}

export async function updateAddress(
  accessToken: string,
  id: string,
  address: AddressInput,
  defaultAddress = false
): Promise<{ address: Address | null; errors: string[] }> {
  const data = await customerAccountFetch<{
    customerAddressUpdate: {
      customerAddress: Address | null;
      userErrors: { field: string; message: string }[];
    };
  }>(
    CUSTOMER_ADDRESS_UPDATE_MUTATION,
    { addressId: id, address, defaultAddress },
    accessToken
  );

  return {
    address: data.customerAddressUpdate.customerAddress,
    errors: data.customerAddressUpdate.userErrors.map((e) => e.message),
  };
}

export async function setDefaultAddress(
  accessToken: string,
  id: string
): Promise<{ errors: string[] }> {
  const data = await customerAccountFetch<{
    customerAddressUpdate: {
      userErrors: { field: string; message: string }[];
    };
  }>(CUSTOMER_ADDRESS_UPDATE_MUTATION, { addressId: id, defaultAddress: true }, accessToken);

  return {
    errors: data.customerAddressUpdate.userErrors.map((e) => e.message),
  };
}

export async function deleteAddress(
  accessToken: string,
  id: string
): Promise<{ success: boolean; errors: string[] }> {
  const data = await customerAccountFetch<{
    customerAddressDelete: {
      deletedAddressId: string;
      userErrors: { field: string; message: string }[];
    };
  }>(CUSTOMER_ADDRESS_DELETE_MUTATION, { id }, accessToken);

  return {
    success: !!data.customerAddressDelete.deletedAddressId,
    errors: data.customerAddressDelete.userErrors.map((e) => e.message),
  };
}
