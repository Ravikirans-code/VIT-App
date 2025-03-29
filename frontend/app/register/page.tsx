"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { register } from "@/lib/auth"
import {
  registerPatientSchema,
  registerProviderSchema,
  type RegisterPatientFormValues,
  type RegisterProviderFormValues,
} from "@/lib/validations/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const [activeTab, setActiveTab] = useState("patient")

  // Create form for patient
  const patientForm = useForm<RegisterPatientFormValues>({
    resolver: zodResolver(registerPatientSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "patient",
    },
  })

  // Create form for provider
  const providerForm = useForm<RegisterProviderFormValues>({
    resolver: zodResolver(registerProviderSchema),
    defaultValues: {
      name: "",
      email: "",
      license: "",
      password: "",
      confirmPassword: "",
      userType: "provider",
    },
  })

  async function onPatientSubmit(data: RegisterPatientFormValues) {
    setServerError("")
    setIsLoading(true)

    try {
      await register(data.name, data.email, data.password, data.userType)
      router.push("/patient/dashboard")
    } catch (err) {
      setServerError("Registration failed. This email may already be in use.")
    } finally {
      setIsLoading(false)
    }
  }

  async function onProviderSubmit(data: RegisterProviderFormValues) {
    setServerError("")
    setIsLoading(true)

    try {
      await register(data.name, data.email, data.password, data.userType)
      router.push("/provider/dashboard")
    } catch (err) {
      setServerError("Registration failed. This email may already be in use.")
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
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your information to create your account</CardDescription>
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
                <form onSubmit={patientForm.handleSubmit(onPatientSubmit)} className="space-y-4">
                  <FormField
                    control={patientForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ravi kiran" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={patientForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Confirm Password</FormLabel>
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
                    {isLoading ? "Creating account..." : "Register as Patient"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="provider">
              <Form {...providerForm}>
                <form onSubmit={providerForm.handleSubmit(onProviderSubmit)} className="space-y-4">
                  <FormField
                    control={providerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. Jane Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    name="license"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>License Number</FormLabel>
                        <FormControl>
                          <Input placeholder="MD12345" {...field} />
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
                  <FormField
                    control={providerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel required>Confirm Password</FormLabel>
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
                    {isLoading ? "Creating account..." : "Register as Provider"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline underline-offset-4 hover:text-primary/90">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

