"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Peru", "Mexico", "Colombia"];

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/landing/wealthexpo.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/landing/wealthexpo.png"
                alt="Logo"
                width={150}
                height={150}
              />
            </Link>
          </NavbarBrand>
          <NavbarItem>
            <Link href="/peru">Peru</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/mexico">Mexico</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/colombia">Colombia</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {status === "loading" ? (
              <p>Loading...</p>
            ) : session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button className="w-full" onClick={() => signOut()}>
              Salir
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}
