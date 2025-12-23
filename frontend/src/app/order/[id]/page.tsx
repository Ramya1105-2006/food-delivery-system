import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-16 flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Card className="w-full max-w-lg text-center p-4 md:p-8 shadow-2xl animate-fade-in-up">
        <CardHeader>
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
          <CardTitle className="text-3xl font-headline mt-4">Order Confirmed!</CardTitle>
          <CardDescription className="text-lg">
            Thank you for your order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">We've received it and are getting it ready for you. You can track the progress of your order below.</p>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-mono text-lg">{params.id}</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/track/${params.id}`}>Track Your Order</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
