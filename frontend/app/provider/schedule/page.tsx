"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { FormError } from "@/components/ui/form-error"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { getPatients } from "@/lib/api"
import type { Patient } from "@/lib/types"
import { validateRequired, type FieldValidation } from "@/lib/validation"

export default function ScheduleVaccination() {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState<string>("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [selectedVaccine, setSelectedVaccine] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [reminder, setReminder] = useState<string>("24")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<FieldValidation>({})

  useEffect(() => {
    async function loadPatients() {
      try {
        const patientsData = await getPatients()
        setPatients(patientsData)
      } catch (error) {
        console.error("Failed to load patients", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPatients()
  }, [])

  const validateForm = (): boolean => {
    const errors: FieldValidation = {}

    errors.patient = validateRequired(selectedPatient, "Patient")
    errors.vaccine = validateRequired(selectedVaccine, "Vaccine")

    if (!date) {
      errors.date = { message: "Appointment date is required", type: "error" }
    }

    errors.time = validateRequired(time, "Appointment time")

    setFormErrors(errors)
    return !Object.values(errors).some((error) => error !== null)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would submit the scheduled vaccination to the server
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/provider/dashboard")
    } catch (error) {
      console.error("Failed to schedule vaccination", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ProviderLayout>
      <div className="container py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Schedule Vaccination</h1>
            <p className="text-muted-foreground">Schedule a vaccination appointment for a patient</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Vaccination Appointment</CardTitle>
            <CardDescription>Schedule a new vaccination appointment for a patient</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">
                  Patient
                  <span className="text-destructive ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger
                    id="patient"
                    aria-required="true"
                    aria-invalid={!!formErrors.patient}
                    aria-describedby={formErrors.patient ? "patient-error" : undefined}
                    className={formErrors.patient ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} (ID: {patient.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormError id="patient-error" message={formErrors.patient?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vaccine">
                  Vaccine
                  <span className="text-destructive ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Select value={selectedVaccine} onValueChange={setSelectedVaccine}>
                  <SelectTrigger
                    id="vaccine"
                    aria-required="true"
                    aria-invalid={!!formErrors.vaccine}
                    aria-describedby={formErrors.vaccine ? "vaccine-error" : undefined}
                    className={formErrors.vaccine ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select a vaccine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="covid-pfizer">COVID-19 (Pfizer)</SelectItem>
                    <SelectItem value="covid-moderna">COVID-19 (Moderna)</SelectItem>
                    <SelectItem value="influenza">Influenza</SelectItem>
                    <SelectItem value="tetanus">Tetanus</SelectItem>
                    <SelectItem value="hepatitis-b">Hepatitis B</SelectItem>
                    <SelectItem value="mmr">MMR</SelectItem>
                  </SelectContent>
                </Select>
                <FormError id="vaccine-error" message={formErrors.vaccine?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-date">
                  Appointment Date
                  <span className="text-destructive ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="appointment-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        formErrors.date && "border-destructive",
                      )}
                      aria-required="true"
                      aria-invalid={!!formErrors.date}
                      aria-describedby={formErrors.date ? "date-error" : undefined}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormError id="date-error" message={formErrors.date?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">
                  Appointment Time
                  <span className="text-destructive ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger
                    id="time"
                    aria-required="true"
                    aria-invalid={!!formErrors.time}
                    aria-describedby={formErrors.time ? "time-error" : undefined}
                    className={formErrors.time ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="09:30">9:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="10:30">10:30 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="13:30">1:30 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="14:30">2:30 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="15:30">3:30 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
                <FormError id="time-error" message={formErrors.time?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes or instructions for the patient"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder">Send Reminder</Label>
                <Select value={reminder} onValueChange={setReminder}>
                  <SelectTrigger id="reminder">
                    <SelectValue placeholder="Select reminder time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 hours before</SelectItem>
                    <SelectItem value="48">48 hours before</SelectItem>
                    <SelectItem value="72">72 hours before</SelectItem>
                    <SelectItem value="none">No reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
              <Button variant="outline" type="button" onClick={() => router.back()} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ProviderLayout>
  )
}

