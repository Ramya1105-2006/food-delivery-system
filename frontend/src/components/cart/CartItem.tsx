"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import type { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <Image
          src={item.image.imageUrl}
          alt={item.name}
          data-ai-hint={item.image.imageHint}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="mx-2 h-6 w-12 text-center"
            aria-label="Item quantity"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => removeFromCart(item.id)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Remove item</span>
      </Button>
    </div>
  );
}
