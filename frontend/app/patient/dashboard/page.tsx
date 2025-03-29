"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { getUserData, getVaccinationHistory, getUpcomingVaccinations } from "@/lib/api"
import { PatientLayout } from "@/components/layouts/patient-layout"
import type { VaccinationRecord, UpcomingVaccination } from "@/lib/types"

export default function PatientDashboard() {
  const [user, setUser] = useState<any>(null)
  const [vaccinationHistory, setVaccinationHistory] = useState<VaccinationRecord[]>([])
  const [upcomingVaccinations, setUpcomingVaccinations] = useState<UpcomingVaccination[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUser(null);
    setVaccinationHistory([]);
    setUpcomingVaccinations([]);
    async function loadData() {
      try {
        const userData = await getUserData()
        const history = await getVaccinationHistory()
        const upcoming = await getUpcomingVaccinations()

        setUser(userData)
        setVaccinationHistory(history)
        setUpcomingVaccinations(upcoming)
      } catch (error) {
        console.error("Failed to load data", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  // Simplified data fetching
  loadData()
  }, [])

  if (isLoading) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p>Loading...</p>
        </div>
      </PatientLayout>
    )
  }

  return (
    <PatientLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">Manage your vaccination records and appointments</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/patient/appointments/new">Schedule Appointment</Link>
          </Button>
        </div>


      </div>
    </PatientLayout>
  )
}

