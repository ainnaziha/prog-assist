"use client"

import { useState } from "react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { siteConfig } from "@/config/site"
import { settings } from "@/config/settings"
import { Loader2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"
import { deleteUser, isAuth } from "@/lib/auth"
import { useRouter } from "next/navigation";

interface NavbarProp {
  isAuth: boolean;
}

export default function Navbar({isAuth}: NavbarProp) {
  const [isLogging, setIsLogging] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    setIsLogging(true);
    deleteUser();
    router.replace('/');
  }

  return (
    <header className="select-none">
      <nav className="mx-auto justify-between px-4 max-w-7xl">
        <div className="flex items-center justify-between py-3">
          <Link href={ isAuth ? '/dashboard' : '/'}>
            <h1 className="text-2xl font-bold duration-200 lg:hover:scale-[1.10]">
              {siteConfig.name}
            </h1>
          </Link>
          <div className="flex gap-1">
            {isAuth && (              
              <Button disabled={ isLogging } variant="outline" size="icon" onClick={ isLogging ? undefined : onLogout }>
                {isLogging ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
              </Button>
            )}
            {settings.themeToggleEnabled && (
              <ModeToggle />
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
