
import { cn } from "@/lib/utils";

interface VegNonVegIconProps {
    type: 'veg' | 'non-veg';
    className?: string;
}

export function VegNonVegIcon({ type, className }: VegNonVegIconProps) {
    const isVeg = type === 'veg';
    const color = isVeg ? 'border-green-600' : 'border-red-600';
    const dotColor = isVeg ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className={cn("flex h-4 w-4 items-center justify-center rounded-sm border", color, className)}>
            <div className={cn("h-2 w-2 rounded-full", dotColor)} />
        </div>
    );
}
