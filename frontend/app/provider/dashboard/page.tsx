"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
            <Button asChild variant="outline">
              <Link href="/provider/schedule">Schedule Vaccination</Link>
            </Button>
            <Button asChild>
              <Link href="/provider/vaccinations/new">Record Vaccination</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{patients.length}</CardTitle>
              <CardDescription>Total Patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground">Active patients in your care</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{appointments.length}</CardTitle>
              <CardDescription>Today's Appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-muted-foreground">Scheduled for today</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">24</CardTitle>
              <CardDescription>Vaccinations This Week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-muted-foreground">Administered in the last 7 days</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">3</CardTitle>
              <CardDescription>Low Inventory Alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-sm text-muted-foreground">Vaccines that need reordering</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="patients">
            <TabsList className="mb-4">
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="inventory">Vaccine Inventory</TabsTrigger>
              <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
            </TabsList>

            <TabsContent value="submissions">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <CardTitle>Patient Submissions</CardTitle>
                      <CardDescription>Review patient-submitted vaccination records</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/provider/submissions">View All Submissions</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium">Patient</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Vaccine</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Submitted</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Sarah Johnson</td>
                          <td className="px-4 py-3 text-sm">Influenza</td>
                          <td className="px-4 py-3 text-sm">2023-10-05</td>
                          <td className="px-4 py-3 text-sm">2023-10-06</td>
                          <td className="px-4 py-3 text-sm">
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/provider/submissions">Review</Link>
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Michael Brown</td>
                          <td className="px-4 py-3 text-sm">Hepatitis B</td>
                          <td className="px-4 py-3 text-sm">2023-09-15</td>
                          <td className="px-4 py-3 text-sm">2023-09-16</td>
                          <td className="px-4 py-3 text-sm">
                            <Button variant="outline" size="sm" asChild>
                              <Link href="/provider/submissions">Review</Link>
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProviderLayout>
  )
}

