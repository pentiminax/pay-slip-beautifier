import { ArrowLeft, Download, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
    period: string
    employee: string
    employer: string
}

export function DashboardHeader({ period, employee, employer }: DashboardHeaderProps) {
    const router = useRouter()

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <Button
                    variant="ghost"
                    className="pl-0 hover:pl-2 transition-all"
                    onClick={() => router.push("/")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Upload
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Payslip Analysis</h1>
                <p className="text-muted-foreground">
                    {period} • {employee} • {employer}
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button>
                    <Download className="mr-2 h-4 w-4" /> Export PDF
                </Button>
            </div>
        </div>
    )
}
