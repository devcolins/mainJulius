"use client";

import * as React from "react";
import Link from "next/link";
import { FaBars } from 'react-icons/fa6'
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu,  MenubarTrigger } from "@/components/ui/menubar";
import { UserNav } from "./user-nav";
import { Search } from "./search";
import { useQueryWithAuth } from "@convex-dev/convex-lucia-auth/react";
import { api } from "@/convex/_generated/api";
import { SignInOut } from "../actions/SignInOut";



export function Header() {

  const user = useQueryWithAuth(api.myFunctions.getUser, {});

  return (
    <header className="flex items-center justify-between px-2 py-2 mt-2">
      <NavigationMenu>
        <div className="hidden mt-2 px-2 md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/pages/shop" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Shop
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pages/vendor" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Vendor
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pages/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pages/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
        <div className="flex md:hidden">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <FaBars className="w-6 h-6" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/pages/shop" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Shop
                    </NavigationMenuLink>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/pages/vendor" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Vendor
                    </NavigationMenuLink>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/pages/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  <Link href="/pages/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/pages/shop" legacyBehavior passHref  className="text-xl md:text-3xl font-mono">
              <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                Venity Mall
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu className="flex">
        <NavigationMenuList>
          {user ? (
            <div className="flex gap-4">
              <NavigationMenuItem className="hidden md:flex">
                <Search />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <UserNav />
              </NavigationMenuItem>
            </div>
          ) : (
            <NavigationMenuItem className=" mr-4 ">
              <SignInOut />
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
