
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

// Mock data for past orders
const mockOrders = [
  { id: "CNE-ABC123XYZ", date: "2024-07-20", total: 450.50, status: "Delivered" },
  { id: "CNE-DEF456UVW", date: "2024-07-18", total: 280.00, status: "Delivered" },
  { id: "CNE-GHI789RST", date: "2024-07-15", total: 750.75, status: "Delivered" },
];


export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold font-headline">Your Profile</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Profile Details Section */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 text-3xl">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.fullName} />
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4 text-2xl">{user.fullName}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
              <Button variant="destructive" className="mt-2 w-full" onClick={logout}>
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Order History Section */}
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold font-headline">Your Orders</h2>
          <Card>
            <CardContent className="p-0">
              <div className="space-y-2">
                {mockOrders.map((order, index) => (
                  <div key={order.id}>
                    <Link href={`/track/${order.id}`} className="block transition-colors hover:bg-muted/50">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                                    <Package className="h-5 w-5 text-secondary-foreground" />
                                </div>
                                <div>
                                    <p className="font-semibold">{`Order #${order.id}`}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(order.date).toLocaleDateString()} - ₹{order.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-green-600 font-medium">{order.status}</span>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                    </Link>
                    {index < mockOrders.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
