
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { MenuItem } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { VegNonVegIcon } from "./icons/VegNonVegIcon";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface DishCardProps {
  item: MenuItem;
}

export function DishCard({ item }: DishCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0">
            <div className="relative h-48 w-full">
                <Image
                    src={item.image.imageUrl}
                    alt={item.name}
                    data-ai-hint={item.image.imageHint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                 <VegNonVegIcon type={item.type} className="absolute top-2 right-2 h-6 w-6 bg-white/80 backdrop-blur-sm p-0.5" />
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-1">
            <h3 className="text-lg font-bold truncate">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground h-10 overflow-hidden text-ellipsis">
                {item.description}
            </p>
        </CardContent>
        <CardFooter className="p-4 flex items-center justify-between">
            <p className="font-bold text-lg text-primary">
                ₹{item.price.toFixed(2)}
            </p>
            <Button size="sm" variant="outline" onClick={handleAddToCart}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
            </Button>
        </CardFooter>
    </Card>
  );
}
