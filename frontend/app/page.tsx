import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
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
          <div className="container mx-auto text-center space-y-6 px-4">
        <h2 className="text-4xl font-bold tracking-tight">Vaccine and Immunization Tracking System</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive system for patients and healthcare providers to manage vaccination records securely.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
          </div>
        </section>
      </main>
    </div>
  )
}

