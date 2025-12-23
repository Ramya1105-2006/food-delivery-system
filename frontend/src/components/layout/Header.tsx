
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/Logo";
import { CartIcon } from "../cart/CartIcon";
import { UserNav } from "./UserNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="VirundhuHub Home">
          <Logo className="h-8 w-8 text-primary" />
          <span className="hidden text-xl font-bold font-headline sm:inline-block">
            VirundhuHub
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <UserNav />
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
