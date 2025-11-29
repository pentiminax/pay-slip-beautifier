"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { DistributionChart } from "@/components/dashboard/distribution-chart"
import { ChargesList } from "@/components/dashboard/charges-list"
import { PayslipData, ChartDataPoint } from "@/types/payslip"

const DEMO_DATA: PayslipData = {
    period: "Octobre 2023",
    employee: "Sophie Martin",
    employer: "Tech Solutions SAS",
    summary: {
        net: 2650.45,
        gross: 3500.00,
        taxes: 849.55,
        employerCost: 4900.00
    },
    details: [
        {
            label: "Salaire de base",
            amount: 3500.00,
            type: "income"
        },
        {
            label: "CSG/CRDS",
            amount: 325.50,
            type: "deduction",
            description: "Contribution Sociale Généralisée. Finance la Sécurité sociale et le remboursement de la dette sociale."
        },
        {
            label: "Assurance Maladie",
            amount: 24.50,
            type: "deduction",
            description: "Couvre vos frais de santé (médecin, médicaments, hôpital)."
        },
        {
            label: "Assurance Vieillesse (Retraite)",
            amount: 295.75,
            type: "deduction",
            description: "Cotisations pour votre future retraite de base et complémentaire."
        },
        {
            label: "Assurance Chômage",
            amount: 142.00,
            type: "deduction",
            description: "Finance l'assurance chômage pour les demandeurs d'emploi."
        },
        {
            label: "Prévoyance & Mutuelle",
            amount: 61.80,
            type: "deduction",
            description: "Couverture complémentaire santé et risques lourds (décès, invalidité)."
        }
    ]
}

export default function DemoPage() {
    const chartData: ChartDataPoint[] = [
        { name: "Net à payer", value: DEMO_DATA.summary.net, color: "#4f46e5" },
        { name: "Charges", value: DEMO_DATA.summary.taxes, color: "#f43f5e" },
    ]

    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                <DashboardHeader
                    period={DEMO_DATA.period}
                    employee={DEMO_DATA.employee}
                    employer={DEMO_DATA.employer}
                />

                <MetricsGrid summary={DEMO_DATA.summary} />

                <div className="grid gap-4 md:grid-cols-7">
                    <DistributionChart data={chartData} />
                    <ChargesList details={DEMO_DATA.details} />
                </div>
            </div>
        </div>
    )
}
