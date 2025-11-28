"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Share2, HelpCircle, TrendingUp, DollarSign, Building2, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

interface AnalysisData {
    period: string
    employee: string
    employer: string
    summary: {
        net: number
        gross: number
        taxes: number
        employerCost: number
    }
    details: {
        label: string
        amount: number
        type: "income" | "deduction"
        description?: string
    }[]
}

export default function Dashboard() {
    const [data, setData] = useState<AnalysisData | null>(null)
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(amount)
    }

    const pieData = [
        { name: "Net à payer", value: data.summary.net, color: "#4f46e5" }, // Primary
        { name: "Charges", value: data.summary.taxes, color: "#f43f5e" }, // Rose-500
    ]

    return (
        <div className="min-h-screen bg-muted/30 p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all" onClick={() => router.push("/")}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Upload
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">Payslip Analysis</h1>
                        <p className="text-muted-foreground">
                            {data.period} • {data.employee} • {data.employer}
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

                {/* Key Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net à Payer</CardTitle>
                            <Wallet className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">{formatCurrency(data.summary.net)}</div>
                            <p className="text-xs text-muted-foreground">
                                Ce qui arrive sur votre compte
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Brut</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(data.summary.gross)}</div>
                            <p className="text-xs text-muted-foreground">
                                Avant prélèvement des charges
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Charges Salariales</CardTitle>
                            <TrendingUp className="h-4 w-4 text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-rose-500">{formatCurrency(data.summary.taxes)}</div>
                            <p className="text-xs text-muted-foreground">
                                {((data.summary.taxes / data.summary.gross) * 100).toFixed(1)}% du brut
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Coût Total Employeur</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(data.summary.employerCost)}</div>
                            <p className="text-xs text-muted-foreground">
                                Ce que vous coûtez réellement
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts and Details */}
                <div className="grid gap-4 md:grid-cols-7">
                    {/* Chart Section */}
                    <Card className="col-span-4 md:col-span-3">
                        <CardHeader>
                            <CardTitle>Distribution</CardTitle>
                            <CardDescription>Répartition de votre salaire brut</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-6 mt-4">
                                {pieData.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-sm font-medium">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Details List */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Comprendre vos charges</CardTitle>
                            <CardDescription>
                                Explication simplifiée de chaque ligne de votre bulletin
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.details.map((item, index) => (
                                    <div key={index} className="flex items-start justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{item.label}</p>
                                            {item.description && (
                                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <HelpCircle className="w-3 h-3" /> {item.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className={cn(
                                            "font-bold",
                                            item.type === "deduction" ? "text-rose-500" : "text-green-600"
                                        )}>
                                            {item.type === "deduction" ? "-" : "+"}{formatCurrency(item.amount)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
