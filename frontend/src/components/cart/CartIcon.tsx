"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartSheet } from "./CartSheet";
import { useState } from "react";

export function CartIcon() {
  const { cartCount } = useCart();
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <CartSheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
            onClick={() => setSheetOpen(true)}
            aria-label={`Open cart with ${cartCount} items`}
        >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartCount}
                </span>
            )}
        </Button>
    </CartSheet>
  );
}
