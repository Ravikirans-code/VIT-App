"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { getUserData, getPatients, getAppointments, getVaccineInventory } from "@/lib/api"
import type { Patient, Appointment, VaccineInventory } from "@/lib/types"

export default function ProviderDashboard() {
  const [user, setUser] = useState<any>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [inventory, setInventory] = useState<VaccineInventory[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const userData = await getUserData()
        const patientsData = await getPatients()
        const appointmentsData = await getAppointments()
        const inventoryData = await getVaccineInventory()

        setUser(userData)
        setPatients(patientsData)
        setAppointments(appointmentsData)
        setInventory(inventoryData)
      } catch (error) {
        console.error("Failed to load data", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <ProviderLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p>Loading...</p>
        </div>
      </ProviderLayout>
    )
  }

  return (
    <ProviderLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Provider Dashboard</h1>
            <p className="text-muted-foreground">Manage patients, appointments, and vaccinations</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button asChild variant="outline">
              <Link href="/provider/patients/new">Add Patient</Link>
            </Button>
            <Button asChild>
              <Link href="/provider/vaccinations/new">Record Vaccination</Link>
            </Button>
          </div>
        </div>

      </div>
    </ProviderLayout>
  )
}

