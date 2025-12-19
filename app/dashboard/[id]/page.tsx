"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { DistributionChart } from "@/components/dashboard/distribution-chart"
import { ChargesList } from "@/components/dashboard/charges-list"
import { ChartDataPoint } from "@/types/payslip"
import { usePayslipHistory } from "@/hooks/use-payslip-history"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardDetailPage() {
    const params = useParams<{ id: string }>()
    const items = usePayslipHistory()

    const id = useMemo(() => params?.id, [params])
    const data = useMemo(() => items.find((p) => p.id === id) ?? null, [id, items])

    if (!data) {
        return (
            <div className="min-h-screen bg-muted/30 p-6 md:p-10">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analyse introuvable</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Cette analyse n&apos;existe plus (ou a été supprimée).
                            </p>
                            <Button asChild>
                                <Link href="/dashboard">Retour à l&apos;historique</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

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
