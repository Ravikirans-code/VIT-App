import * as z from "zod"

// Vaccination submission form schema
export const vaccinationSubmissionSchema = z.object({
  vaccine: z.string().min(1, { message: "Vaccine type is required" }),
  date: z
    .string()
    .min(1, { message: "Date is required" })
    .refine(
      (date) => {
        const selectedDate = new Date(date)
        const today = new Date()
        return selectedDate <= today
      },
      { message: "Date cannot be in the future" },
    ),
  provider: z.string().min(1, { message: "Healthcare provider/location is required" }),
  lotNumber: z.string().optional(),
  notes: z.string().optional(),
})

export type VaccinationSubmissionFormValues = z.infer<typeof vaccinationSubmissionSchema>

// Schedule vaccination form schema
export const scheduleVaccinationSchema = z.object({
  patient: z.string().min(1, { message: "Patient is required" }),
  vaccine: z.string().min(1, { message: "Vaccine is required" }),
  date: z
    .date({
      required_error: "Appointment date is required",
      invalid_type_error: "Please select a valid date",
    })
    .refine(
      (date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date >= today
      },
      { message: "Date must be today or in the future" },
    ),
  time: z.string().min(1, { message: "Appointment time is required" }),
  notes: z.string().optional(),
  reminder: z.string().optional(),
})

export type ScheduleVaccinationFormValues = z.infer<typeof scheduleVaccinationSchema>

// Record vaccination form schema
export const recordVaccinationSchema = z.object({
  patient: z.string().min(1, { message: "Patient is required" }),
  vaccine: z.string().min(1, { message: "Vaccine is required" }),
  date: z
    .string()
    .min(1, { message: "Date is required" })
    .refine(
      (date) => {
        const selectedDate = new Date(date)
        const today = new Date()
        return selectedDate <= today
      },
      { message: "Date cannot be in the future" },
    ),
  site: z.string().min(1, { message: "Administration site is required" }),
  route: z.string().min(1, { message: "Administration route is required" }),
  notes: z.string().optional(),
})

export type RecordVaccinationFormValues = z.infer<typeof recordVaccinationSchema>

// Review submission schema
export const reviewSubmissionSchema = z.object({
  reviewNotes: z.string().min(1, { message: "Review notes are required" }),
})

export type ReviewSubmissionFormValues = z.infer<typeof reviewSubmissionSchema>

