import Image from "next/image";
import { getRestaurantById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Star, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MenuItemCard } from "@/components/MenuItemCard";
import type { Metadata } from 'next'
import React from 'react';
 
type Props = {
  params: { id: string }
}
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaurant = await getRestaurantById(params.id);
 
  if (!restaurant) {
    return {
      title: 'Restaurant not found'
    }
  }

  return {
    title: `${restaurant.name} - VirundhuHub`,
    description: `Order delicious ${restaurant.cuisine.toLowerCase()} food from ${restaurant.name}.`,
  }
}

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = await getRestaurantById(params.id);

  if (!restaurant) {
    notFound();
  }
  
  return (
    <div>
      <div className="relative h-64 md:h-96 w-full">
        <Image 
          src={restaurant.coverImage.imageUrl} 
          alt={`Cover image for ${restaurant.name}`}
          data-ai-hint={restaurant.coverImage.imageHint}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">{restaurant.name}</h1>
          <p className="mt-2 text-lg capitalize">{restaurant.cuisine}</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
            {restaurant.menu.map((category) => (
            <section key={category.title} className="mb-12">
                <h2 className="text-3xl font-bold font-headline mb-6">{category.title}</h2>
                <div className="flex flex-col">
                {category.items.map((item, itemIndex) => (
                    <React.Fragment key={item.id}>
                      <MenuItemCard item={item} />
                      {itemIndex < category.items.length - 1 && <Separator className="my-2" />}
                    </React.Fragment>
                ))}
                </div>
            </section>
            ))}
        </div>
      </div>
    </div>
  )
}
