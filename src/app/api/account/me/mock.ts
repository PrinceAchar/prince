import { NextResponse } from "next/server";
import { withSessionToken } from "@/lib/auth-helpers";

export async function GET(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    // Mock customer data - in a real implementation, you would fetch this from Shopify
    const mockCustomer = {
      firstName: "John",
      lastName: "Doe",
      emailAddress: { emailAddress: "john.doe@example.com" },
      phoneNumber: { phoneNumber: "+91 98765 43210" },
      orders: {
        edges: [
          {
            node: {
              id: "order1",
              number: 1001,
              processedAt: "2023-10-15T10:00:00Z",
              financialStatus: "PAID",
              fulfillments: {
                nodes: [{ status: "FULFILLED" }]
              },
              totalPrice: {
                amount: "599",
                currencyCode: "INR"
              },
              lineItems: {
                edges: [
                  {
                    node: {
                      title: "Amla Murabha",
                      quantity: 2,
                      price: { amount: "299", currencyCode: "INR" },
                      image: { url: "/product1.jpg", altText: "Amla Murabha" }
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      addresses: {
        edges: [
          {
            node: {
              id: "address1",
              firstName: "John",
              lastName: "Doe",
              address1: "123 Main Street",
              address2: null,
              city: "New Delhi",
              zoneCode: "DL",
              zip: "110001",
              territoryCode: null,
              phoneNumber: "+91 98765 43210"
            }
          }
        ]
      },
      defaultAddress: { id: "address1" }
    };

    return NextResponse.json({ customer: mockCustomer });
  });
}

export async function PATCH(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const body: { firstName?: string; lastName?: string } = await request.json().catch(() => ({}));
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }

    // Mock update - in a real implementation, you would call Shopify's API
    const updatedCustomer = {
      firstName,
      lastName,
      emailAddress: { emailAddress: "john.doe@example.com" },
      phoneNumber: { phoneNumber: "+91 98765 43210" },
      orders: {
        edges: []
      },
      addresses: {
        edges: []
      },
      defaultAddress: null
    };

    return NextResponse.json({ customer: updatedCustomer });
  });
}