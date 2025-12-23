import type { ImagePlaceholder } from "./placeholder-images";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  coverImage: ImagePlaceholder;
  menu: MenuCategory[];
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ImagePlaceholder;
  type: 'veg' | 'non-veg';
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
    email: string;
    fullName: string;
}
