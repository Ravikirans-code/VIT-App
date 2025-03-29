"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  Syringe,
  FileText,
  Settings,
  LogOut,
  Menu,
  Calendar,
  ClipboardCheck,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

interface ProviderLayoutProps {
  children: React.ReactNode
}

export function ProviderLayout({ children }: ProviderLayoutProps) {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "/provider/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/provider/patients", label: "Patients", icon: Users },
    { href: "/provider/vaccinations", label: "Vaccinations", icon: Syringe },
    { href: "/provider/submissions", label: "Submissions", icon: ClipboardCheck },
    { href: "/provider/schedule", label: "Schedule", icon: Calendar },
    { href: "/provider/reports", label: "Reports", icon: FileText },
    { href: "/provider/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 sm:max-w-xs">
                <div className="flex h-16 items-center border-b px-4">
                  <Link href="/" className="flex items-center gap-2 font-bold">
                    VIT
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-2 text-sm font-medium"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        {item.label}
                      </Link>
                    )
                  })}
                  <Link
                    href="/logout"
                    className="flex items-center gap-2 text-sm font-medium text-destructive"
                    onClick={() => setOpen(false)}
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                    Logout
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 font-bold">
              VIT
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Provider profile" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r md:flex">
          <nav className="flex flex-col gap-4 p-4" aria-label="Main navigation">
            {navItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Link key={index} href={item.href} className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
            <div className="flex-1" />
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-destructive">
              <LogOut className="h-5 w-5" aria-hidden="true" />
              Logout
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

