// Form validation utility functions

export type ValidationError = {
  message: string
  type: "error" | "warning"
}

export type FieldValidation = {
  [key: string]: ValidationError | null
}

// Email validation
export function validateEmail(email: string): ValidationError | null {
  if (!email) {
    return { message: "Email is required", type: "error" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email address", type: "error" }
  }

  return null
}

// Password validation
export function validatePassword(password: string): ValidationError | null {
  if (!password) {
    return { message: "Password is required", type: "error" }
  }

  if (password.length < 8) {
    return { message: "Password must be at least 8 characters long", type: "error" }
  }

  // Check for at least one number and one letter
  const hasNumber = /\d/.test(password)
  const hasLetter = /[a-zA-Z]/.test(password)

  if (!hasNumber || !hasLetter) {
    return {
      message: "Password must contain at least one letter and one number",
      type: "error",
    }
  }

  return null
}

// Confirm password validation
export function validateConfirmPassword(password: string, confirmPassword: string): ValidationError | null {
  if (!confirmPassword) {
    return { message: "Please confirm your password", type: "error" }
  }

  if (password !== confirmPassword) {
    return { message: "Passwords do not match", type: "error" }
  }

  return null
}

// Name validation
export function validateName(name: string): ValidationError | null {
  if (!name) {
    return { message: "Name is required", type: "error" }
  }

  if (name.length < 2) {
    return { message: "Name must be at least 2 characters long", type: "error" }
  }

  return null
}

// Date validation
export function validateDate(date: string): ValidationError | null {
  if (!date) {
    return { message: "Date is required", type: "error" }
  }

  const selectedDate = new Date(date)
  const today = new Date()

  if (selectedDate > today) {
    return { message: "Date cannot be in the future", type: "error" }
  }

  return null
}

// Future date validation (for appointments)
export function validateFutureDate(date: string): ValidationError | null {
  if (!date) {
    return { message: "Date is required", type: "error" }
  }

  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to beginning of day

  if (selectedDate < today) {
    return { message: "Date must be today or in the future", type: "error" }
  }

  return null
}

// Required field validation
export function validateRequired(value: string, fieldName: string): ValidationError | null {
  if (!value || value.trim() === "") {
    return { message: `${fieldName} is required`, type: "error" }
  }

  return null
}

// License number validation
export function validateLicenseNumber(license: string): ValidationError | null {
  if (!license) {
    return { message: "License number is required", type: "error" }
  }

  // Simple pattern check - can be customized based on actual license format
  if (license.length < 5) {
    return { message: "License number must be at least 5 characters", type: "error" }
  }

  return null
}

// Form field validation helper
export function getFieldError(errors: FieldValidation, fieldName: string): string | undefined {
  return errors[fieldName]?.message
}

// Check if form has any errors
export function hasErrors(errors: FieldValidation): boolean {
  return Object.values(errors).some((error) => error !== null)
}

