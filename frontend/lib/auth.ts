// Mock authentication functions

export async function login(email: string, password: string, userType: string) {
  // In a real app, this would make an API call to authenticate the user
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful login
      resolve({
        id: "user123",
        name: userType === "patient" ? "John Doe" : "Dr. Sarah Johnson",
        email,
        userType,
      })
    }, 1000)
  })
}

export async function register(name: string, email: string, password: string, userType: string) {
  // In a real app, this would make an API call to register the user
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful registration
      resolve({
        id: "user123",
        name,
        email,
        userType,
      })
    }, 1000)
  })
}

export async function logout() {
  // In a real app, this would clear the authentication token
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

export function isAuthenticated() {
  // In a real app, this would check if the user has a valid token
  return true
}

