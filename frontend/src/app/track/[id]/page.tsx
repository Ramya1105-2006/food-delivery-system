import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UtensilsCrossed, CookingPot, Bike, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const trackingSteps = [
    {
        icon: UtensilsCrossed,
        title: "Order Confirmed",
        description: "Your order has been received.",
        status: "completed"
    },
    {
        icon: CookingPot,
        title: "Preparing Food",
        description: "The restaurant is preparing your meal.",
        status: "completed"
    },
    {
        icon: Bike,
        title: "Out for Delivery",
        description: "Your rider is on their way.",
        status: "active"
    },
    {
        icon: PartyPopper,
        title: "Delivered",
        description: "Enjoy your meal!",
        status: "pending"
    }
]

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Track Your Order</CardTitle>
          <CardDescription>Order ID: {params.id}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
            <div className="space-y-8">
                {trackingSteps.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-full border-2",
                                step.status === 'completed' && "bg-primary border-primary text-primary-foreground",
                                step.status === 'active' && "bg-primary/20 border-primary text-primary animate-pulse",
                                step.status === 'pending' && "bg-muted border-border text-muted-foreground",
                            )}>
                                <step.icon className="h-6 w-6" />
                            </div>
                            {index < trackingSteps.length - 1 && (
                                <div className={cn(
                                    "w-0.5 flex-1 mt-2",
                                    step.status === 'completed' ? "bg-primary" : "bg-border"
                                )}></div>
                            )}
                        </div>
                        <div className="pt-2">
                            <h3 className="font-semibold text-lg">{step.title}</h3>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          <Separator className="my-8" />
          <div className="text-center">
            <p className="text-muted-foreground">Estimated Delivery Time</p>
            <p className="text-2xl font-bold text-primary">15-20 minutes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
