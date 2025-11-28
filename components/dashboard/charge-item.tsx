import { HelpCircle } from "lucide-react"
import { PayslipDetail } from "@/types/payslip"
import { formatCurrency } from "@/lib/formatters"
import { cn } from "@/lib/utils"

interface ChargeItemProps {
    item: PayslipDetail
}

export function ChargeItem({ item }: ChargeItemProps) {
    return (
        <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{item.label}</p>
                {item.description && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" /> {item.description}
                    </p>
                )}
            </div>
            <div
                className={cn(
                    "font-bold",
                    item.type === "deduction" ? "text-rose-500" : "text-green-600"
                )}
            >
                {item.type === "deduction" ? "-" : "+"}
                {formatCurrency(item.amount)}
            </div>
        </div>
    )
}
