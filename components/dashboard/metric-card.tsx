import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
    title: string
    value: string
    description: string
    icon: LucideIcon
    iconColor?: string
    valueColor?: string
}

export function MetricCard({
    title,
    value,
    description,
    icon: Icon,
    iconColor = "text-muted-foreground",
    valueColor,
}: MetricCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${iconColor}`} />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${valueColor || ""}`}>{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
