"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { PatientLayout } from "@/components/layouts/patient-layout"
import { FileUpload } from "@/components/file-upload"
import { vaccinationSubmissionSchema, type VaccinationSubmissionFormValues } from "@/lib/validations/vaccination"

export default function VaccinationSubmissions() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("submit")
  const [serverError, setServerError] = useState("")
  const [submittedVaccinations, setSubmittedVaccinations] = useState([
    {
      id: "SV001",
      vaccine: "COVID-19 (Moderna)",
      date: "2023-03-15",
      provider: "Community Health Clinic",
      status: "Approved",
      notes: "Booster dose",
    },
    {
      id: "SV002",
      vaccine: "Influenza",
      date: "2023-10-05",
      provider: "Pharmacy Vaccination Service",
      status: "Pending",
      notes: "Annual flu shot",
    },
  ])

  // Create form
  const form = useForm<VaccinationSubmissionFormValues>({
    resolver: zodResolver(vaccinationSubmissionSchema),
    defaultValues: {
      vaccine: "",
      date: "",
      provider: "",
      lotNumber: "",
      notes: "",
    },
  })

  async function onSubmit(data: VaccinationSubmissionFormValues) {
    setServerError("")
    setIsSubmitting(true)

    try {
      // In a real app, this would submit the vaccination record to the server
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add the new submission to the list (in a real app, this would come from the server)
      const newSubmission = {
        id: `SV00${submittedVaccinations.length + 1}`,
        vaccine: data.vaccine,
        date: data.date,
        provider: data.provider,
        status: "Pending",
        notes: data.notes || "",
      }

      setSubmittedVaccinations([...submittedVaccinations, newSubmission])

      // Reset the form
      form.reset()

      // Switch to the history tab
      setActiveTab("history")
    } catch (error) {
      console.error("Failed to submit vaccination", error)
      setServerError("Failed to submit vaccination. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PatientLayout>
      <div className="container py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Vaccination Submissions</h1>
            <p className="text-muted-foreground">Submit vaccinations you've received outside our system</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full md:w-auto">
            <TabsTrigger value="submit">Submit New</TabsTrigger>
            <TabsTrigger value="history" id="history-tab">
              Submission History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Submit Vaccination Record</CardTitle>
                <CardDescription>Please provide details about a vaccination you received elsewhere</CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="vaccine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Vaccine Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vaccine type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="COVID-19 (Pfizer)">COVID-19 (Pfizer)</SelectItem>
                              <SelectItem value="COVID-19 (Moderna)">COVID-19 (Moderna)</SelectItem>
                              <SelectItem value="COVID-19 (Johnson & Johnson)">COVID-19 (Johnson & Johnson)</SelectItem>
                              <SelectItem value="Influenza">Influenza</SelectItem>
                              <SelectItem value="Tetanus">Tetanus</SelectItem>
                              <SelectItem value="Hepatitis A">Hepatitis A</SelectItem>
                              <SelectItem value="Hepatitis B">Hepatitis B</SelectItem>
                              <SelectItem value="MMR">MMR (Measles, Mumps, Rubella)</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Date Administered</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription>The date when you received this vaccination</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="provider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Healthcare Provider/Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Pharmacy, Doctor's Office, Clinic" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lotNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lot Number (if available)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., AB1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any additional information about this vaccination" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel id="proof-label">Proof of Vaccination (optional)</FormLabel>
                      <FileUpload aria-labelledby="proof-label" />
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload an image of your vaccination card or documentation
                      </p>
                    </div>

                    {serverError && (
                      <div className="flex items-center gap-2 text-sm text-destructive mt-1.5" role="alert">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        <span>{serverError}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => router.push("/patient/dashboard")}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Submitting..." : "Submit for Verification"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Submission History</CardTitle>
                <CardDescription>Track the status of your vaccination submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="rounded-md border min-w-full">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr className="bg-muted/50">
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                            ID
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                            Vaccine
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                            Provider
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                            Status
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card">
                        {submittedVaccinations.map((submission, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm">{submission.id}</td>
                            <td className="px-4 py-3 text-sm">{submission.vaccine}</td>
                            <td className="px-4 py-3 text-sm">{submission.date}</td>
                            <td className="px-4 py-3 text-sm">{submission.provider}</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge
                                variant="outline"
                                className={
                                  submission.status === "Approved"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : submission.status === "Pending"
                                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                                }
                              >
                                {submission.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PatientLayout>
  )
}

