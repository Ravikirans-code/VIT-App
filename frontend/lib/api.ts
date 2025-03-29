import type { Patient, Appointment, VaccinationRecord, UpcomingVaccination, VaccineInventory } from "./types"

// Mock API functions

export async function getUserData() {
  // In a real app, this would fetch user data from the server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "user123",
        name: "Ravi kiran",
        email: "john@example.com",
        dob: "1985-05-15",
      })
    }, 500)
  })
}

export async function getPatients(): Promise<Patient[]> {

  const token = localStorage.getItem("jwtToken");
  if (!token) {
    throw new Error("JWT token is missing");
  }

  const response = await fetch("http://localhost:4300/api/auth/patients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patients: ${response.statusText}`);
  }

  return response.json();
}

export async function getAppointments(): Promise<Appointment[]> {
  // In a real app, this would fetch appointments from the server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "A001", patientName: "John Smith", time: "09:00 AM", purpose: "COVID-19 Vaccine", status: "Confirmed" },
        { id: "A002", patientName: "Sarah Johnson", time: "10:30 AM", purpose: "Flu Shot", status: "Confirmed" },
        { id: "A003", patientName: "Michael Brown", time: "01:15 PM", purpose: "Tetanus Booster", status: "Pending" },
        {
          id: "A004",
          patientName: "Emily Davis",
          time: "03:00 PM",
          purpose: "Vaccination Review",
          status: "Confirmed",
        },
      ])
    }, 500)
  })
}

export async function getVaccinationHistory(): Promise<VaccinationRecord[]> {
  // In a real app, this would fetch vaccination history from the server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "V001",
          vaccine: "COVID-19 (Pfizer)",
          date: "2021-05-10",
          provider: "Dr. Sarah Johnson",
          lotNumber: "EL0725",
        },
        {
          id: "V002",
          vaccine: "COVID-19 (Pfizer)",
          date: "2021-06-01",
          provider: "Dr. Sarah Johnson",
          lotNumber: "EL0825",
        },
        { id: "V003", vaccine: "Influenza", date: "2022-10-15", provider: "Dr. Michael Chen", lotNumber: "FL2245" },
        { id: "V004", vaccine: "Tetanus", date: "2019-03-22", provider: "Dr. Robert Wilson", lotNumber: "TT5567" },
      ])
    }, 500)
  })
}

export async function getUpcomingVaccinations(): Promise<UpcomingVaccination[]> {
  // In a real app, this would fetch upcoming vaccinations from the server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "UV001", name: "Influenza", dueDate: "2023-10-15", description: "Annual flu shot" },
        { id: "UV002", name: "Hepatitis B", dueDate: "2023-06-30", description: "Final dose in series" },
      ])
    }, 500)
  })
}

export async function getVaccineInventory(): Promise<VaccineInventory[]> {
  // In a real app, this would fetch vaccine inventory from the server
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "VI001",
          name: "COVID-19 (Pfizer)",
          manufacturer: "Pfizer",
          lotNumber: "EL0725",
          expiration: "2023-12-31",
          quantity: 45,
        },
        {
          id: "VI002",
          name: "COVID-19 (Moderna)",
          manufacturer: "Moderna",
          lotNumber: "MOD2234",
          expiration: "2023-11-30",
          quantity: 32,
        },
        {
          id: "VI003",
          name: "Influenza",
          manufacturer: "Sanofi",
          lotNumber: "FL2245",
          expiration: "2023-10-15",
          quantity: 18,
        },
        {
          id: "VI004",
          name: "Tetanus",
          manufacturer: "GSK",
          lotNumber: "TT5567",
          expiration: "2024-05-20",
          quantity: 8,
        },
        {
          id: "VI005",
          name: "Hepatitis B",
          manufacturer: "Merck",
          lotNumber: "HB7788",
          expiration: "2024-02-28",
          quantity: 3,
        },
      ])
    }, 500)
  })
}

