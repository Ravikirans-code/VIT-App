import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">VIT</h1>
          <nav className="space-x-4">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-muted">
          <div className="container text-center space-y-6 px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Vaccination & Immunization Tracking</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive system for patients and healthcare providers to manage vaccination records securely.
            </p>

          </div>
        </section>
      </main>

      <footer className="bg-muted py-6">
        <div className="container text-center text-muted-foreground px-4 md:px-6">
          <p>© {new Date().getFullYear()} VIT - Vaccination & Immunization Tracking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

