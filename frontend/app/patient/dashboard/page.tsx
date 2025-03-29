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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Vaccination Status</CardTitle>
              <CardDescription>Your current immunization status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>COVID-19</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Up to date
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Influenza</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Due soon
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tetanus</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Up to date
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hepatitis B</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Overdue
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Vaccinations</CardTitle>
              <CardDescription>Vaccinations you should schedule</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingVaccinations.length > 0 ? (
                <div className="space-y-4">
                  {upcomingVaccinations.map((vaccination, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="font-medium">{vaccination.name}</div>
                      <div className="text-sm text-muted-foreground">Due by: {vaccination.dueDate}</div>
                      <div className="text-sm text-muted-foreground">{vaccination.description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No upcoming vaccinations at this time.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Next Appointment</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-3 bg-muted/50">
                  <div className="font-medium">Dr. Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">May 15, 2023 - 10:30 AM</div>
                  <div className="text-sm text-muted-foreground">City Health Clinic</div>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Reschedule
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button variant="link" asChild>
                    <Link href="/patient/appointments">View all appointments</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Submit Vaccinations</CardTitle>
              <CardDescription>Record vaccinations received elsewhere</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Have you received a vaccination from another provider? Submit it for our records.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/patient/submissions">Submit Vaccination</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="history">
            <TabsList className="mb-4">
              <TabsTrigger value="history">Vaccination History</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccination History</CardTitle>
                  <CardDescription>Your complete vaccination record</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium">Vaccine</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Provider</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Lot Number</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card">
                        {vaccinationHistory.length > 0 ? (
                          vaccinationHistory.map((record, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm">{record.vaccine}</td>
                              <td className="px-4 py-3 text-sm">{record.date}</td>
                              <td className="px-4 py-3 text-sm">{record.provider}</td>
                              <td className="px-4 py-3 text-sm">{record.lotNumber}</td>
                              <td className="px-4 py-3 text-sm">
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Completed
                                </Badge>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-3 text-sm text-center text-muted-foreground">
                              No vaccination records found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccination Calendar</CardTitle>
                  <CardDescription>View and schedule your vaccinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <Calendar />
                    </div>
                    <div className="md:w-1/2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                      <h3 className="font-medium mb-2">Upcoming Events</h3>
                      <div className="space-y-3">
                        <div className="p-3 rounded-md bg-yellow-50 border border-yellow-200">
                          <div className="font-medium">Influenza Vaccine</div>
                          <div className="text-sm">May 15, 2023 - 10:30 AM</div>
                        </div>
                        <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                          <div className="font-medium">Vaccination Reminder</div>
                          <div className="text-sm">Hepatitis B - Overdue</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Vaccination Documents</CardTitle>
                  <CardDescription>Access and download your vaccination certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">COVID-19 Vaccination Certificate</div>
                        <div className="text-sm text-muted-foreground">Issued: Jan 15, 2023</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">International Certificate of Vaccination</div>
                        <div className="text-sm text-muted-foreground">Issued: Mar 10, 2023</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">Childhood Immunization Record</div>
                        <div className="text-sm text-muted-foreground">Issued: Sep 5, 2022</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PatientLayout>
  )
}

