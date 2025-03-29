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
import { ProviderLayout } from "@/components/layouts/provider-layout"
import { getPatients, getVaccineInventory } from "@/lib/api"
import type { Patient, VaccineInventory } from "@/lib/types"

export default function RecordVaccination() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")

  const [patients, setPatients] = useState<Patient[]>([])
  const [vaccines, setVaccines] = useState<VaccineInventory[]>([])
  const [selectedPatient, setSelectedPatient] = useState<string>(patientId || "")
  const [selectedVaccine, setSelectedVaccine] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Record Vaccination</h1>
            <p className="text-muted-foreground">Document a new vaccination for a patient</p>
          </div>
        </div>


      </div>
    </ProviderLayout>
  )
}

