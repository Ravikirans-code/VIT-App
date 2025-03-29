import * as z from "zod"

// Login form schema
export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
  userType: z.enum(["patient", "provider"]),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// Registration form schema
export const registerPatientSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Full name is required" })
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
      }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    userType: z.literal("patient"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type RegisterPatientFormValues = z.infer<typeof registerPatientSchema>

export const registerProviderSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Full name is required" })
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email address" }),
    license: z
      .string()
      .min(1, { message: "License number is required" })
      .min(5, { message: "License number must be at least 5 characters" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
      }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    userType: z.literal("provider"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type RegisterProviderFormValues = z.infer<typeof registerProviderSchema>

