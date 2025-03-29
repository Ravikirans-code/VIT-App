import type { Patient, Appointment, VaccinationRecord, UpcomingVaccination, VaccineInventory } from "./types";

// API base URL
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4300/api";

// Helper function to get JWT token
function getToken(): string {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    throw new Error("User is not authenticated");
  }
  return token;
}

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Error: ${response.statusText}`);
  }
  return response.json();
}

// Fetch user data
export async function getUserData() {
  const token = getToken();
  const response = await fetch(`${apiUrl}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Fetch patients
export async function getPatients(): Promise<Patient[]> {
  const token = getToken();
  const response = await fetch(`${apiUrl}/patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Fetch appointments
export async function getAppointments(): Promise<Appointment[]> {
  const token = getToken();
  const response = await fetch(`${apiUrl}/appointments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Fetch vaccination history
export async function getVaccinationHistory(): Promise<VaccinationRecord[]> {
  const token = getToken();
  const response = await fetch(`${apiUrl}/vaccination-history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Fetch upcoming vaccinations
export async function getUpcomingVaccinations(): Promise<UpcomingVaccination[]> {
  const token = getToken();
  const response = await fetch(`${apiUrl}/upcoming-vaccinations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Fetch vaccine inventory
export async function getVaccineInventory(): Promise<VaccineInventory[]> {
  const token = getToken();
  const response = await fetch(`${apiUrl}/vaccine-inventory`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}
