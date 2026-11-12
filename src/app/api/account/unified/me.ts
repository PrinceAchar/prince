import { NextResponse } from "next/server";
import { withSessionToken } from "@/lib/auth-helpers";
import { getCurrentUser } from "@/lib/auth-unified";

export async function GET(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    try {
      // Try to get real user data from Shopify first
      const user = await getCurrentUser(request);
      
      if (user) {
        return NextResponse.json({ customer: user });
      }
      
      // If that fails, return mock data
      const mockCustomer = {
        firstName: "John",
        lastName: "Doe",
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
      
      return NextResponse.json({ customer: mockCustomer });
    } catch (error) {
      console.error("Error getting user data:", error);
      
      // Return mock data as fallback
      const mockCustomer = {
        firstName: "John",
        lastName: "Doe",
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
      
      return NextResponse.json({ customer: mockCustomer });
    }
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

    // In a real implementation, you would update the user's name in Shopify
    // For now, we'll just return the updated name
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