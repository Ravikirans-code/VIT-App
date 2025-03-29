"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProviderLayout } from "@/components/layouts/provider-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FormError } from "@/components/ui/form-error"
import { CheckCircle, XCircle, AlertCircle, Search } from "lucide-react"
import { validateRequired, type FieldValidation } from "@/lib/validation"

export default function PatientSubmissions() {
  const [pendingSubmissions, setPendingSubmissions] = useState([
    {
      id: "SV002",
      patientId: "P002",
      patientName: "Sarah Johnson",
      vaccine: "Influenza",
      date: "2023-10-05",
      provider: "Pharmacy Vaccination Service",
      status: "Pending",
      notes: "Annual flu shot",
      submittedDate: "2023-10-06",
    },
    {
      id: "SV003",
      patientId: "P003",
      patientName: "Michael Brown",
      vaccine: "Hepatitis B",
      date: "2023-09-15",
      provider: "Travel Clinic",
      status: "Pending",
      notes: "Final dose in series",
      submittedDate: "2023-09-16",
    },
    {
      id: "SV004",
      patientId: "P004",
      patientName: "Emily Davis",
      vaccine: "Tetanus",
      date: "2023-08-22",
      provider: "Urgent Care Center",
      status: "Pending",
      notes: "Received after minor injury",
      submittedDate: "2023-08-23",
    },
  ])

  const [processedSubmissions, setProcessedSubmissions] = useState([
    {
      id: "SV001",
      patientId: "P001",
      patientName: "John Smith",
      vaccine: "COVID-19 (Moderna)",
      date: "2023-03-15",
      provider: "Community Health Clinic",
      status: "Approved",
      notes: "Booster dose",
      submittedDate: "2023-03-16",
      processedDate: "2023-03-17",
      reviewNotes: "Documentation verified",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [reviewNotes, setReviewNotes] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formErrors, setFormErrors] = useState<FieldValidation>({})

  const filteredPending = pendingSubmissions.filter(
    (submission) =>
      submission.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.vaccine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredProcessed = processedSubmissions.filter(
    (submission) =>
      submission.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.vaccine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const validateReview = (): boolean => {
    const errors: FieldValidation = {}

    if (selectedSubmission?.status === "Pending") {
      errors.reviewNotes = validateRequired(reviewNotes, "Review notes")
    }

    setFormErrors(errors)
    return !Object.values(errors).some((error) => error !== null)
  }

  const handleApprove = () => {
    if (!selectedSubmission) return

    if (!validateReview()) return

    // Move from pending to processed
    const updatedPending = pendingSubmissions.filter((s) => s.id !== selectedSubmission.id)
    const approvedSubmission = {
      ...selectedSubmission,
      status: "Approved",
      processedDate: new Date().toISOString().split("T")[0],
      reviewNotes: reviewNotes,
    }

    setPendingSubmissions(updatedPending)
    setProcessedSubmissions([...processedSubmissions, approvedSubmission])
    setDialogOpen(false)
    setReviewNotes("")
    setFormErrors({})
  }

  const handleReject = () => {
    if (!selectedSubmission) return

    if (!validateReview()) return

    // Move from pending to processed with rejected status
    const updatedPending = pendingSubmissions.filter((s) => s.id !== selectedSubmission.id)
    const rejectedSubmission = {
      ...selectedSubmission,
      status: "Rejected",
      processedDate: new Date().toISOString().split("T")[0],
      reviewNotes: reviewNotes,
    }

    setPendingSubmissions(updatedPending)
    setProcessedSubmissions([...processedSubmissions, rejectedSubmission])
    setDialogOpen(false)
    setReviewNotes("")
    setFormErrors({})
  }

  const openSubmissionDialog = (submission: any) => {
    setSelectedSubmission(submission)
    setReviewNotes("")
    setFormErrors({})
    setDialogOpen(true)
  }

  return (
    <ProviderLayout>
      <div className="container py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Patient Vaccination Submissions</h1>
            <p className="text-muted-foreground">Review and verify patient-submitted vaccination records</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Search submissions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search submissions"
            />
          </div>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="mb-4 w-full md:w-auto">
            <TabsTrigger value="pending">
              Pending Review
              {pendingSubmissions.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {pendingSubmissions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="processed">Processed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Submissions</CardTitle>
                <CardDescription>Review and verify patient-submitted vaccination records</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredPending.length > 0 ? (
                  <div className="overflow-x-auto">
                    <div className="rounded-md border min-w-full">
                      <table className="min-w-full divide-y divide-border" aria-label="Pending vaccination submissions">
                        <thead>
                          <tr className="bg-muted/50">
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              ID
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Patient
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
                              Submitted
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-card">
                          {filteredPending.map((submission, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm">{submission.id}</td>
                              <td className="px-4 py-3 text-sm font-medium">{submission.patientName}</td>
                              <td className="px-4 py-3 text-sm">{submission.vaccine}</td>
                              <td className="px-4 py-3 text-sm">{submission.date}</td>
                              <td className="px-4 py-3 text-sm">{submission.provider}</td>
                              <td className="px-4 py-3 text-sm">{submission.submittedDate}</td>
                              <td className="px-4 py-3 text-sm">
                                <Button variant="outline" size="sm" onClick={() => openSubmissionDialog(submission)}>
                                  Review
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-medium">No pending submissions</h3>
                    <p className="text-muted-foreground mt-2">
                      All patient-submitted vaccination records have been processed.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processed">
            <Card>
              <CardHeader>
                <CardTitle>Processed Submissions</CardTitle>
                <CardDescription>Previously reviewed vaccination submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredProcessed.length > 0 ? (
                  <div className="overflow-x-auto">
                    <div className="rounded-md border min-w-full">
                      <table
                        className="min-w-full divide-y divide-border"
                        aria-label="Processed vaccination submissions"
                      >
                        <thead>
                          <tr className="bg-muted/50">
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              ID
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Patient
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Vaccine
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Date
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Status
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Processed
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-sm font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border bg-card">
                          {filteredProcessed.map((submission, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm">{submission.id}</td>
                              <td className="px-4 py-3 text-sm font-medium">{submission.patientName}</td>
                              <td className="px-4 py-3 text-sm">{submission.vaccine}</td>
                              <td className="px-4 py-3 text-sm">{submission.date}</td>
                              <td className="px-4 py-3 text-sm">
                                <Badge
                                  variant="outline"
                                  className={
                                    submission.status === "Approved"
                                      ? "bg-green-50 text-green-700 border-green-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                                  }
                                >
                                  {submission.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">{submission.processedDate}</td>
                              <td className="px-4 py-3 text-sm">
                                <Button variant="outline" size="sm" onClick={() => openSubmissionDialog(submission)}>
                                  View Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
                    <h3 className="text-lg font-medium">No processed submissions</h3>
                    <p className="text-muted-foreground mt-2">
                      No patient-submitted vaccination records have been processed yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedSubmission?.status === "Pending"
                ? "Review Vaccination Submission"
                : "Vaccination Submission Details"}
            </DialogTitle>
            <DialogDescription>
              {selectedSubmission?.status === "Pending"
                ? "Verify the information and approve or reject this submission."
                : "View details of this processed submission."}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Patient</h4>
                  <p>{selectedSubmission.patientName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Submission ID</h4>
                  <p>{selectedSubmission.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Vaccine</h4>
                  <p>{selectedSubmission.vaccine}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date Administered</h4>
                  <p>{selectedSubmission.date}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Provider/Location</h4>
                <p>{selectedSubmission.provider}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Patient Notes</h4>
                <p className="text-sm">{selectedSubmission.notes || "No notes provided"}</p>
              </div>

              {selectedSubmission.status !== "Pending" && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Review Notes</h4>
                  <p className="text-sm">{selectedSubmission.reviewNotes || "No review notes"}</p>
                </div>
              )}

              {selectedSubmission.status === "Pending" && (
                <div className="space-y-2">
                  <Label htmlFor="review-notes">
                    Review Notes
                    <span className="text-destructive ml-1" aria-hidden="true">
                      *
                    </span>
                  </Label>
                  <Textarea
                    id="review-notes"
                    placeholder="Add notes about your verification decision"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    aria-required="true"
                    aria-invalid={!!formErrors.reviewNotes}
                    aria-describedby={formErrors.reviewNotes ? "review-notes-error" : undefined}
                    className={formErrors.reviewNotes ? "border-destructive" : ""}
                  />
                  <FormError id="review-notes-error" message={formErrors.reviewNotes?.message} />
                </div>
              )}

              {/* Show proof of vaccination if available */}
              <div className="border rounded-md p-3 bg-muted/50">
                <h4 className="text-sm font-medium mb-2">Proof of Vaccination</h4>
                <p className="text-sm text-muted-foreground">No documentation uploaded</p>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row justify-between gap-3">
            {selectedSubmission?.status === "Pending" ? (
              <>
                <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button variant="destructive" onClick={handleReject} className="w-full sm:w-auto">
                    <XCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                    Reject
                  </Button>
                  <Button variant="default" onClick={handleApprove} className="w-full sm:w-auto">
                    <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                    Approve
                  </Button>
                </div>
              </>
            ) : (
              <Button variant="default" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProviderLayout>
  )
}

