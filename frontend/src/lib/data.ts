
import { PlaceHolderImages } from "./placeholder-images";
import type { Restaurant, MenuItem } from "./types";

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback or error
        return {
            id: 'fallback',
            description: 'fallback image',
            imageUrl: 'https://picsum.photos/seed/fallback/600/400',
            imageHint: 'food'
        }
    }
    return img;
}

const mockRestaurants: Restaurant[] = [
    {
      id: "REST_SOUTH_01",
      name: "South Indian Corner",
      cuisine: "South Indian",
      rating: 4.8,
      deliveryTime: "20-30 min",
      coverImage: getImage('restaurant-rest_south_01'),
      menu: [
        {
          title: "South Indian",
          items: [
            { id: "si-1", name: "Masala Dosa", description: "Crispy dosa with spiced potato filling", price: 120, image: getImage('menu-masala-dosa'), type: 'veg' },
            { id: "si-2", name: "Plain Dosa", description: "Classic thin crispy dosa", price: 90, image: getImage('menu-plain-dosa'), type: 'veg' },
            { id: "si-6", name: "Parotta", description: "Layered flatbread served hot", price: 40, image: getImage('menu-parotta'), type: 'veg' },
            { id: "si-7", name: "Kothu Parotta", description: "Shredded parotta tossed with spices", price: 140, image: getImage('menu-kothu-parotta'), type: 'veg' },
            { id: "si-3", name: "Idli", description: "Soft steamed rice cakes", price: 60, image: getImage('menu-idli'), type: 'veg' },
            { id: "si-4", name: "Pongal", description: "Rice and dal cooked with pepper and ghee", price: 80, image: getImage('menu-pongal'), type: 'veg' },
            { id: "si-9", name: "Curd Rice", description: "Rice mixed with curd and seasoning", price: 70, image: getImage('menu-curd-rice'), type: 'veg' },
            { id: "si-10", name: "Mint Rice", description: "Rice flavored with mint leaves", price: 90, image: getImage('menu-mint-rice'), type: 'veg' },
            { id: "si-11", name: "Tamarind Rice", description: "Tangy rice with tamarind flavor", price: 90, image: getImage('menu-tamarind-rice'), type: 'veg' },
            { id: "si-12", name: "Dal Rice", description: "Rice served with plain dal", price: 85, image: getImage('menu-dal-rice'), type: 'veg' },
            { id: "si-13", name: "Potato Fry", description: "Spicy fried potato cubes", price: 60, image: getImage('menu-potato-fry'), type: 'veg' },
            { id: "si-14", name: "Adai", description: "Protein-rich mixed lentil dosa", price: 100, image: getImage('menu-adai'), type: 'veg' },
            { id: "si-5", name: "Uttapam", description: "Thick dosa topped with vegetables", price: 110, image: getImage('menu-uttapam'), type: 'veg' },
            { id: "si-15", name: "Idiyappam", description: "Steamed rice noodles", price: 90, image: getImage('menu-idiyappam'), type: 'veg' },
            { id: "si-16", name: "Kottan Choru", description: "Traditional mixed rice meal", price: 120, image: getImage('menu-kottan-choru'), type: 'veg' },
            { id: "si-17", name: "Full Meals", description: "Complete South Indian veg meals", price: 180, image: getImage('menu-full-meals'), type: 'veg' },
            { id: "si-18", name: "Lemon Rice", description: "Rice flavored with lemon and spices", price: 80, image: getImage('menu-lemon-rice'), type: 'veg' },
          ]
        }
      ]
    },
    {
      id: "REST_NORTH_01",
      name: "North Indian Tadka",
      cuisine: "North Indian",
      rating: 4.7,
      deliveryTime: "30-40 min",
      coverImage: getImage('restaurant-rest_north_01'),
      menu: [
        {
          title: "North Indian",
          items: [
            { id: "ni-1", name: "Shawarma", description: "Spiced meat wrap with sauces", price: 160, image: getImage('menu-shawarma'), type: 'non-veg' },
            { id: "ni-2", name: "Chapathi", description: "Soft wheat flatbread", price: 40, image: getImage('menu-chapathi'), type: 'veg' },
            { id: "ni-3", name: "Butter Chapathi", description: "Chapathi topped with butter", price: 50, image: getImage('menu-butter-chapathi'), type: 'veg' },
          ]
        }
      ]
    },
    {
      id: "REST_BIRYANI_01",
      name: "Biryani House",
      cuisine: "Biryani",
      rating: 4.9,
      deliveryTime: "35-45 min",
      coverImage: getImage('restaurant-rest_biryani_01'),
      menu: [
        {
          title: "Biryani",
          items: [
            { id: "b-1", name: "Chicken Biryani", description: "Aromatic basmati rice with chicken", price: 220, image: getImage('menu-chicken-biryani'), type: 'non-veg' },
            { id: "b-2", name: "Mutton Biryani", description: "Slow cooked mutton with spices", price: 280, image: getImage('menu-mutton-biryani'), type: 'non-veg' },
            { id: "b-3", name: "Egg Biryani", description: "Biryani cooked with boiled eggs", price: 180, image: getImage('menu-egg-biryani'), type: 'non-veg' },
            { id: "b-4", name: "Prawn Biryani", description: "Flavorful biryani with prawns", price: 260, image: getImage('menu-prawn-biryani'), type: 'non-veg' },
            { id: "b-5", name: "Veg Biryani", description: "Vegetable biryani with mild spices", price: 170, image: getImage('menu-veg-biryani'), type: 'veg' },
          ]
        }
      ]
    },
    {
      id: "REST_STREET_01",
      name: "Street Food Junction",
      cuisine: "Street Food",
      rating: 4.6,
      deliveryTime: "15-25 min",
      coverImage: getImage('restaurant-rest_street_01'),
      menu: [
        {
          title: "Street Food",
          items: [
            { id: "sf-1", name: "Pani Puri", description: "Crispy puris with tangy water", price: 40, image: getImage('menu-pani-puri'), type: 'veg' },
            { id: "sf-2", name: "Mushroom Fry", description: "Spicy fried mushroom pieces", price: 120, image: getImage('menu-mushroom-fry'), type: 'veg' },
            { id: "sf-3", name: "Fried Rice", description: "Street-style vegetable fried rice", price: 140, image: getImage('menu-fried-rice'), type: 'veg' },
            { id: "sf-4", name: "Barbecue Chicken", description: "Grilled chicken with BBQ flavor", price: 200, image: getImage('menu-barbecue-chicken'), type: 'non-veg' },
            { id: "sf-5", name: "Mango Chat", description: "Tangy raw mango snack", price: 50, image: getImage('menu-mango-chat'), type: 'veg' },
            { id: "sf-6", name: "Masala Pori", description: "Puffed rice mixed with spices", price: 35, image: getImage('menu-masala-pori'), type: 'veg' },
            { id: "sf-7", name: "Samosa Chat", description: "Crushed samosa with chutneys", price: 70, image: getImage('menu-samosa-chaat'), type: 'veg' },
            { id: "sf-8", name: "Thattai Chat", description: "Crispy thattai mixed with masala", price: 60, image: getImage('menu-thattai-chat'), type: 'veg' },
          ]
        }
      ]
    },
    {
      id: "REST_SNACKS_01",
      name: "Snack Attack",
      cuisine: "Snacks",
      rating: 4.4,
      deliveryTime: "20-30 min",
      coverImage: getImage('restaurant-rest_snacks_01'),
      menu: [
        {
          title: "Snacks",
          items: [
            { id: "sn-1", name: "Samosa", description: "Crispy fried potato samosa", price: 25, image: getImage('menu-samosa'), type: 'veg' },
            { id: "sn-2", name: "Bajji", description: "Deep fried gram flour snack", price: 30, image: getImage('menu-bajji'), type: 'veg' },
            { id: "sn-3", name: "Bonda", description: "Soft fried potato balls", price: 30, image: getImage('menu-bonda'), type: 'veg' },
            { id: "sn-4", name: "Soup", description: "Hot vegetable soup", price: 60, image: getImage('menu-soup'), type: 'veg' },
            { id: "sn-5", name: "Poli", description: "Sweet stuffed flatbread", price: 50, image: getImage('menu-poli'), type: 'veg' },
            { id: "sn-6", name: "Sundal", description: "Boiled legumes with seasoning", price: 40, image: getImage('menu-sundal'), type: 'veg' },
            { id: "sn-7", name: "Kachayam", description: "Traditional fried sweet snack", price: 40, image: getImage('menu-kachayam'), type: 'veg' },
          ]
        }
      ]
    },
    {
      id: "REST_DESSERT_01",
      name: "Dessert Island",
      cuisine: "Desserts",
      rating: 4.9,
      deliveryTime: "20-30 min",
      coverImage: getImage('restaurant-rest_dessert_01'),
      menu: [
        {
          title: "Desserts",
          items: [
            { id: "d-1", name: "Gulab Jamun", description: "Soft milk dumplings in syrup", price: 60, image: getImage('menu-gulab-jamun'), type: 'veg' },
            { id: "d-2", name: "Rasgulla", description: "Spongy cottage cheese balls", price: 60, image: getImage('menu-rasgulla'), type: 'veg' },
            { id: "d-3", name: "Black Forest Cake", description: "Chocolate cake with cream", price: 120, image: getImage('menu-black-forest-cake'), type: 'veg' },
            { id: "d-4", name: "Ice Cream", description: "Chilled ice cream scoop", price: 80, image: getImage('menu-ice-cream'), type: 'veg' },
            { id: "d-5", name: "Lemon Juice", description: "Fresh lemon juice", price: 40, image: getImage('menu-lemon-juice'), type: 'veg' },
            { id: "d-6", name: "Falooda", description: "Rose flavored dessert drink", price: 120, image: getImage('menu-falooda'), type: 'veg' },
            { id: "d-7", name: "Laddu", description: "Traditional sweet laddu", price: 50, image: getImage('menu-laddu'), type: 'veg' },
            { id: "d-8", name: "Palkova", description: "Milk-based sweet delicacy", price: 70, image: getImage('menu-palkova'), type: 'veg' },
            { id: "d-9", name: "Honey Cake", description: "Soft cake with honey flavor", price: 100, image: getImage('menu-honey-cake'), type: 'veg' },
          ]
        }
      ]
    }
  ];

// Simulate API call
export async function getRestaurants(): Promise<Omit<Restaurant, 'menu'>[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRestaurants.map(({ menu, ...restaurant }) => {
    // We don't need the full menu on the list page
    return { ...restaurant, coverImage: getImage(`restaurant-${restaurant.id.toLowerCase()}`) || restaurant.coverImage };
  });
}

export async function getRestaurantById(id: string): Promise<Restaurant | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const restaurant = mockRestaurants.find(r => r.id === id);
  return restaurant;
}

export async function getPopularDishes(): Promise<MenuItem[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Return a selection of popular dishes from various restaurants
    const popular: MenuItem[] = [
        mockRestaurants[0].menu[0].items[0], // Masala Dosa
        mockRestaurants[2].menu[0].items[0], // Chicken Biryani
        mockRestaurants[1].menu[0].items[0], // Shawarma
        mockRestaurants[3].menu[0].items[0], // Pani Puri
    ];
    return popular;
}
