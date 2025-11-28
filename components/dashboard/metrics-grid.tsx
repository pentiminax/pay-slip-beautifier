import { Wallet, DollarSign, TrendingUp, Building2 } from "lucide-react"
import { MetricCard } from "./metric-card"
import { PayslipSummary } from "@/types/payslip"
import { formatCurrency, calculatePercentage } from "@/lib/formatters"

interface MetricsGridProps {
    summary: PayslipSummary
}

export function MetricsGrid({ summary }: MetricsGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
                title="Net à Payer"
                value={formatCurrency(summary.net)}
                description="Ce qui arrive sur votre compte"
                icon={Wallet}
                iconColor="text-primary"
                valueColor="text-primary"
            />
            <MetricCard
                title="Total Brut"
                value={formatCurrency(summary.gross)}
                description="Avant prélèvement des charges"
                icon={DollarSign}
            />
            <MetricCard
                title="Charges Salariales"
                value={formatCurrency(summary.taxes)}
                description={`${calculatePercentage(summary.taxes, summary.gross)}% du brut`}
                icon={TrendingUp}
                iconColor="text-rose-500"
                valueColor="text-rose-500"
            />
            <MetricCard
                title="Coût Total Employeur"
                value={formatCurrency(summary.employerCost)}
                description="Ce que vous coûtez réellement"
                icon={Building2}
            />
        </div>
    )
}
