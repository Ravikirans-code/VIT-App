"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PatientLayout } from "@/components/layouts/patient-layout";
import { useSearchParams } from "next/navigation";

export default function PatientDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  useEffect(() => {
    setUser(null);
    async function loadData() {
      try {
        const token = JSON.parse(
          localStorage.getItem("userDetails") || "{}"
        ).jwtToken;

        const userDataDecoded = JSON.parse(atob(token.split(".")[1]));
        console.log(token, userDataDecoded);

      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    }
    // Simplified data fetching
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <p>Loading...</p>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {user?.name}
            </h1>
            <p className="text-muted-foreground">
              Manage your vaccination records and appointments
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/patient/appointments/new">Schedule Appointment</Link>
          </Button>
        </div>
      </div>
    </PatientLayout>
  );
}
