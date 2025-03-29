"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FormError } from "@/components/ui/form-error"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { getPatients, getVaccineInventory } from "@/lib/api"
import type { Patient, VaccineInventory } from "@/lib/types"
import { validateRequired, validateDate, type FieldValidation } from "@/lib/validation"

export default function RecordVaccination() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")

  const [patients, setPatients] = useState<Patient[]>([])
  const [vaccines, setVaccines] = useState<VaccineInventory[]>([])
  const [selectedPatient, setSelectedPatient] = useState<string>(patientId || "")
  const [selectedVaccine, setSelectedVaccine] = useState<string>("")
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [site, setSite] = useState<string>("left-arm")
  const [route, setRoute] = useState<string>("im")
  const [notes, setNotes] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<FieldValidation>({})

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [patientsData, vaccinesData] = await Promise.all([getPatients(), getVaccineInventory()])

        setPatients(patientsData)
        setVaccines(vaccinesData)
      } catch (error) {
        console.error("Failed to load data", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const validateForm = (): boolean => {
    const errors: FieldValidation = {}

    errors.patient = validateRequired(selectedPatient, "Patient")
    errors.vaccine = validateRequired(selectedVaccine, "Vaccine")
    errors.date = validateDate(date)
    errors.site = validateRequired(site, "Administration site")
    errors.route = validateRequired(route, "Administration route")

    setFormErrors(errors)
    return !Object.values(errors).some((error) => error !== null)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would submit the vaccination record to the server
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/provider/dashboard")
    } catch (error) {
      console.error("Failed to submit vaccination record", error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <div className="container py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Record Vaccination</h1>
            <p className="text-muted-foreground">Document a new vaccination for a patient</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Vaccination Details</CardTitle>
            <CardDescription>Enter the details of the vaccination administered</CardDescription>
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
                    {vaccines.map((vaccine) => (
                      <SelectItem key={vaccine.id} value={vaccine.id}>
                        {vaccine.name} (Lot: {vaccine.lotNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormError id="vaccine-error" message={formErrors.vaccine?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">
                  Date Administered
                  <span className="text-destructive ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  aria-required="true"
                  aria-invalid={!!formErrors.date}
                  aria-describedby={formErrors.date ? "date-error" : undefined}
                  className={formErrors.date ? "border-destructive" : ""}
                />
                <FormError id="date-error" message={formErrors.date?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site">
                  Administration Site
                  <span className="text-destructive ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Select value={site} onValueChange={setSite}>
                  <SelectTrigger
                    id="site"
                    aria-required="true"
                    aria-invalid={!!formErrors.site}
                    aria-describedby={formErrors.site ? "site-error" : undefined}
                    className={formErrors.site ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select administration site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left-arm">Left Arm</SelectItem>
                    <SelectItem value="right-arm">Right Arm</SelectItem>
                    <SelectItem value="left-thigh">Left Thigh</SelectItem>
                    <SelectItem value="right-thigh">Right Thigh</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormError id="site-error" message={formErrors.site?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="route">
                  Administration Route
                  <span className="text-destructive ml-1" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Select value={route} onValueChange={setRoute}>
                  <SelectTrigger
                    id="route"
                    aria-required="true"
                    aria-invalid={!!formErrors.route}
                    aria-describedby={formErrors.route ? "route-error" : undefined}
                    className={formErrors.route ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select administration route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="im">Intramuscular (IM)</SelectItem>
                    <SelectItem value="sc">Subcutaneous (SC)</SelectItem>
                    <SelectItem value="id">Intradermal (ID)</SelectItem>
                    <SelectItem value="oral">Oral</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormError id="route-error" message={formErrors.route?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional notes or observations"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
              <Button variant="outline" type="button" onClick={() => router.back()} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Saving..." : "Record Vaccination"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ProviderLayout>
  )
}

