"use server";

import { redirect } from "next/navigation";
import { CartItem } from "@/lib/types";

export async function placeOrder(cartItems: CartItem[]): Promise<{ success: boolean, error?: string }> {
  try {
    console.log("Placing order with items:", cartItems);

    if (!cartItems || cartItems.length === 0) {
        return { success: false, error: "Your cart is empty." };
    }

    // In a real app, you would save this to a database and get a real order ID.
    const newOrderId = `CNE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate some network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    redirect(`/order/${newOrderId}`);
    // Note: redirect() throws an error to stop execution, so we won't hit the return statement below.
    // However, to satisfy TypeScript, we can return here.
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
        // This is the expected behavior of redirect, so we re-throw it.
        throw error;
    }
    console.error("Failed to place order:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
