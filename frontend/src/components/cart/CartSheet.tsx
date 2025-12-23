"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "./CartItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { placeOrder } from "@/app/actions";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartSheetProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartSheet({ children, open, onOpenChange }: CartSheetProps) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handlePlaceOrder = () => {
    startTransition(async () => {
      const result = await placeOrder(JSON.parse(JSON.stringify(cartItems)));
      if(result.success) {
        toast({
            title: "Order Placed!",
            description: "You will be redirected to the confirmation page.",
        });
        clearCart();
        onOpenChange(false);
      } else {
        toast({
            title: "Order Failed",
            description: result.error,
            variant: "destructive",
        });
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl font-headline">Your Cart</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto pt-6">
                <div className="w-full space-y-4">
                    <Separator />
                    <div className="flex items-center justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <Button
                        size="lg"
                        className="w-full text-lg"
                        onClick={handlePlaceOrder}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            "Place Order"
                        )}
                    </Button>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some delicious food to get started!</p>
            <Button asChild onClick={() => onOpenChange(false)}>
                <Link href="/">Browse Restaurants</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
