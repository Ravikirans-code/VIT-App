// Mock authentication functions

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4300/auth/api";

export async function login(email: string, password: string, userType: string) {
  // In a real app, this would make an API call to authenticate the user
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock successful login
      resolve({
        id: "user123",
        name: userType === "patient" ? "Ravi kiran" : "Dr. Sara",
        email,
        userType,
      })
    }, 1000)
  })
}

export async function register(name: string, email: string, password: string, userType: string) {
  try {
    const response = await fetch(url + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, userType }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
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

