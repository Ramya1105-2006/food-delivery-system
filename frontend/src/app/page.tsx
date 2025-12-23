
"use client";

import { useState, useEffect } from "react";
import { getRestaurants, getRestaurantById } from "@/lib/data";
import { DishCard } from "@/components/DishCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Bike, Leaf, ShieldCheck, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Restaurant, MenuItem } from "@/lib/types";

const cuisineCategories = [
  { name: "South Indian", icon: "https://img.freepik.com/premium-photo/indian-cuisine-meals-served-banana-leaf-traditional-south-indian-cuisine_875825-50086.jpg?w=2000", emoji: "🥞" },
  { name: "North Indian", icon: "https://sukhis.com/app/uploads/2022/05/image2-3.jpg", emoji: "🍲" },
  { name: "Biryani", icon: "https://wallpapers.com/images/hd/biryani-1920-x-1281-background-1c1gwrx2o5e156fc.jpg", emoji: "🍗" },
  { name: "Street Food", icon: "https://img.freepik.com/premium-photo/indian-street-food_1120177-16868.jpg", emoji: "🌶️" },
  { name: "Snacks", icon: "https://tse3.mm.bing.net/th/id/OIP.Rk8sTHtxqzrH-71iHcy1zgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3", emoji: "🍔" },
  { name: "Desserts", icon: "https://www.tasteofhome.com/wp-content/uploads/2021/01/soan-papdi-indian-dessert.jpg", emoji: "🍰" },
];

const features = [
    { icon: Bike, title: "Fast Delivery", description: "Get your food delivered in minutes." },
    { icon: Leaf, title: "Fresh & Hygienic Food", description: "Prepared with the freshest ingredients." },
    { icon: Utensils, title: "Wide Variety", description: "Hundreds of dishes to choose from." },
    { icon: ShieldCheck, title: "Secure Payments", description: "Safe and easy online payments." },
];


function TopRestaurants() {
    const [restaurants, setRestaurants] = useState<Omit<Restaurant, 'menu'>[]>([]);

    useEffect(() => {
        async function fetchRestaurants() {
            const allRestaurants = await getRestaurants();
            setRestaurants(allRestaurants);
        }
        fetchRestaurants();
    }, []);

  if (!restaurants.length) return null; // Or a loading skeleton

  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent>
        {restaurants.map((restaurant) => (
          <CarouselItem key={restaurant.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <RestaurantCard restaurant={restaurant} />
              </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
    </Carousel>
  );
}


export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [allDishes, setAllDishes] = useState<MenuItem[]>([]);

    useEffect(() => {
        async function fetchAllData() {
            const restaurantList = await getRestaurants();
            
            const restaurantDetailsPromises = restaurantList.map(r => getRestaurantById(r.id));
            const restaurantsWithMenus = await Promise.all(restaurantDetailsPromises);

            const allItems = restaurantsWithMenus
                .filter((r): r is Restaurant => r !== undefined)
                .flatMap(r => r.menu)
                .flatMap(mc => mc.items);

            setAllDishes(allItems);
        }
        fetchAllData();
    }, []);

    const handleCategorySelect = (categoryName: string) => {
        setSelectedCategory(categoryName);
    };

    const clearCategorySelection = () => {
        setSelectedCategory(null);
    };

    const getFilteredDishes = () => {
        if (!selectedCategory) {
            // Show a default selection of 4 popular dishes when no category is selected.
            const popularDishIds = ['si-1', 'b-1', 'ni-1', 'sf-1'];
            return allDishes.filter(dish => popularDishIds.includes(dish.id));
        }
        
        const lowerCaseCategory = selectedCategory.toLowerCase();
        let categoryDishes: MenuItem[] = [];
        
        // A more robust filtering logic
        if(lowerCaseCategory.includes('south indian')) {
            categoryDishes = allDishes.filter(d => d.id.startsWith('si-'));
        } else if(lowerCaseCategory.includes('north indian')) {
            categoryDishes = allDishes.filter(d => d.id.startsWith('ni-'));
        } else if(lowerCaseCategory.includes('biryani')) {
            categoryDishes = allDishes.filter(d => d.id.startsWith('b-'));
        } else if(lowerCaseCategory.includes('street food')) {
            categoryDishes = allDishes.filter(d => d.id.startsWith('sf-'));
        } else if(lowerCaseCategory.includes('snacks')) {
            categoryDishes = allDishes.filter(d => d.id.startsWith('sn-'));
        } else if(lowerCaseCategory.includes('desserts')) {
            categoryDishes = allDishes.filter(d => d.id.startsWith('d-'));
        } else {
            categoryDishes = allDishes.filter(dish => 
                dish.name.toLowerCase().includes(lowerCaseCategory) || 
                dish.description.toLowerCase().includes(lowerCaseCategory)
            );
        }
        
        return categoryDishes.slice(0, 4);
    }
    
    const filteredDishes = getFilteredDishes();
    const selectedCategoryDetails = cuisineCategories.find(c => c.name === selectedCategory);


  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image 
          src="https://img.freepik.com/premium-photo/traditional-south-indian-meal-food-served-big-banana-leaf-food-platter-complete-thali-selective-focus_466689-50749.jpg?w=2000"
          alt="A delicious spread of Indian food"
          fill
          className="object-cover"
          priority
          data-ai-hint="south indian food"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold animate-fade-in-down">
            Order Authentic Indian Food Near You
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl animate-fade-in-up">
            From street food to royal biryanis — order your favorites anytime.
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        {/* Cuisine Categories Section */}
        <section className="py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">What's on your mind?</h2>
             <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {cuisineCategories.map((category) => (
                    <CarouselItem key={category.name} className="basis-1/3 sm:basis-1/4 md:basis-1/6 lg:basis-1/8">
                        <button onClick={() => handleCategorySelect(category.name)} className="group flex flex-col items-center gap-2 text-center w-full">
                            <div className="relative h-24 w-24 overflow-hidden rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                                <Image
                                src={category.icon}
                                alt={category.name}
                                data-ai-hint="cuisine category"
                                fill
                                className="object-cover"
                                sizes="96px"
                                />
                            </div>
                            <span className="font-semibold text-foreground">{category.name}</span>
                        </button>
                    </CarouselItem>
                    ))}
                </CarouselContent>
             </Carousel>
        </section>

        {/* Popular Dishes Section */}
        <section className="py-12">
            {selectedCategory ? (
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">
                        {selectedCategoryDetails?.emoji} {selectedCategory}
                    </h2>
                    <Button variant="ghost" onClick={clearCategorySelection}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to all dishes
                    </Button>
                </div>
            ) : (
                <h2 className="text-3xl font-bold mb-8">Top Picks For You</h2>
            )}

            {filteredDishes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredDishes.map((dish) => (
                        <DishCard key={dish.id} item={dish} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No dishes found for this category. Try another!</p>
                </div>
            )}
        </section>

        {/* Top Restaurants Section */}
        <section className="py-12 bg-secondary/30 rounded-lg -mx-4 px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Top Restaurants Near You</h2>
            <Button variant="ghost" asChild>
                <Link href="#">See All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <TopRestaurants />
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-12">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                    <div key={feature.title} className="text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                            <feature.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
