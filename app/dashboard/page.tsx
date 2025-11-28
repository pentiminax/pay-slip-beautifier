"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { DistributionChart } from "@/components/dashboard/distribution-chart"
import { ChargesList } from "@/components/dashboard/charges-list"
import { PayslipData, ChartDataPoint } from "@/types/payslip"

export default function Dashboard() {
    const [data, setData] = useState<PayslipData | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedData = localStorage.getItem("payslipData")
        if (!storedData) {
            router.push("/")
            return
        }
        setData(JSON.parse(storedData))
    }, [router])

    if (!data) return null

    const chartData: ChartDataPoint[] = [
        { name: "Net à payer", value: data.summary.net, color: "#4f46e5" },
        { name: "Charges", value: data.summary.taxes, color: "#f43f5e" },
    ]

    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                <DashboardHeader
                    period={data.period}
                    employee={data.employee}
                    employer={data.employer}
                />

                <MetricsGrid summary={data.summary} />

                <div className="grid gap-4 md:grid-cols-7">
                    <DistributionChart data={chartData} />
                    <ChargesList details={data.details} />
                </div>
            </div>
        </div>
    )
}
