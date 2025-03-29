// Authentication functions with real endpoints

const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4300/auth/api";

export async function login(email: string, password: string, userType: string) {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, userType }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function register(name: string, email: string, password: string, userType: string) {
  try {
    const response = await fetch(`${url}/register`, {
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
  try {
    const response = await fetch(`${url}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
}

export function isAuthenticated() {
  // Replace this with a real token validation logic
  return !!localStorage.getItem('authToken');
}
