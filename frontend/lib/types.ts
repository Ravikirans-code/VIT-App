export interface Patient {
  id: string
  name: string
  dob: string
  status: "Up to date" | "Due soon" | "Overdue"
}

export interface Appointment {
  id: string
  patientName: string
  time: string
  purpose: string
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled"
}

export interface VaccinationRecord {
  id: string
  vaccine: string
  date: string
  provider: string
  lotNumber: string
}

export interface UpcomingVaccination {
  id: string
  name: string
  dueDate: string
  description: string
}

export interface VaccineInventory {
  id: string
  name: string
  manufacturer: string
  lotNumber: string
  expiration: string
  quantity: number
}

