"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { login } from "@/lib/auth"
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [activeTab, setActiveTab] = useState("patient")

  // Create form for patient
  const patientForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "patient",
    },
  })

  // Create form for provider
  const providerForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "provider",
    },
  })

  // Get the active form based on the tab
  const activeForm = activeTab === "patient" ? patientForm : providerForm

  async function onSubmit(data: LoginFormValues) {
    setServerError("")
    setIsLoading(true)

    try {
      await login(data.email, data.password, data.userType)

      if (data.userType === "patient") {
        router.push("/patient/dashboard")
      } else {
        router.push("/provider/dashboard")
      }
    } catch (err) {
      setServerError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-8 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="text-center mb-2">
            <Link href="/" className="text-2xl font-bold">
              VIT
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="patient"
            className="w-full"
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value)
              setServerError("")
            }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="provider">Healthcare Provider</TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <Form {...patientForm}>
                <form onSubmit={patientForm.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={patientForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={patientForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {serverError && (
                    <div className="flex items-center gap-2 text-sm text-destructive mt-1.5" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login as Patient"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="provider">
              <Form {...providerForm}>
                <form onSubmit={providerForm.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={providerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={providerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {serverError && (
                    <div className="flex items-center gap-2 text-sm text-destructive mt-1.5" role="alert">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login as Provider"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary underline underline-offset-4 hover:text-primary/90">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

