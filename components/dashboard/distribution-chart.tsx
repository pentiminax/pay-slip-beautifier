import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartDataPoint } from "@/types/payslip"
import { formatCurrency } from "@/lib/formatters"

interface DistributionChartProps {
    data: ChartDataPoint[]
}

export function DistributionChart({ data }: DistributionChartProps) {
    return (
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
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip
                                formatter={(value: number) => formatCurrency(value)}
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "none",
                                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    {data.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm font-medium">{entry.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
