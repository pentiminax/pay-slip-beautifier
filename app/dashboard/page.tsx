"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { clearPayslips, deletePayslip } from "@/lib/storage"
import { usePayslipHistory } from "@/hooks/use-payslip-history"

function formatDate(dateIso: string): string {
    const date = new Date(dateIso)
    if (Number.isNaN(date.getTime())) return dateIso
    return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

export default function DashboardHistoryPage() {
    const items = usePayslipHistory()
    const router = useRouter()

    const hasItems = useMemo(() => items.length > 0, [items.length])

    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Historique</h1>
                        <p className="text-muted-foreground">Retrouvez vos analyses de bulletins</p>
                    </div>
                    <div className="flex gap-2">
                        {hasItems && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    clearPayslips()
                                }}
                            >
                                Tout effacer
                            </Button>
                        )}
                        <Button onClick={() => router.push("/")}>Nouveau bulletin</Button>
                    </div>
                </div>

                {!hasItems ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>Aucune analyse sauvegardée</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Uploadez un bulletin PDF pour créer votre première analyse.
                            </p>
                            <Button onClick={() => router.push("/")}>Uploader un bulletin</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {items.map((payslip) => (
                            <Card key={payslip.id}>
                                <CardHeader className="space-y-1">
                                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <span className="truncate">
                                            {payslip.period} • {payslip.employer}
                                        </span>
                                        <span className="text-sm font-normal text-muted-foreground">
                                            {formatDate(payslip.createdAt)}
                                        </span>
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {payslip.employee}
                                        {payslip.source?.fileName ? ` • ${payslip.source.fileName}` : ""}
                                    </p>
                                </CardHeader>
                                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex gap-6 text-sm">
                                        <div>
                                            <div className="text-muted-foreground">Net</div>
                                            <div className="font-medium">{formatCurrency(payslip.summary.net)}</div>
                                        </div>
                                        <div>
                                            <div className="text-muted-foreground">Charges</div>
                                            <div className="font-medium">{formatCurrency(payslip.summary.taxes)}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button asChild variant="outline">
                                            <Link href={`/dashboard/${payslip.id}`}>Ouvrir</Link>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                deletePayslip(payslip.id)
                                            }}
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
