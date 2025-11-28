export interface PayslipSummary {
    net: number
    gross: number
    taxes: number
    employerCost: number
}

export interface PayslipDetail {
    label: string
    amount: number
    type: "income" | "deduction"
    description?: string
}

export interface PayslipData {
    period: string
    employee: string
    employer: string
    summary: PayslipSummary
    details: PayslipDetail[]
}

export interface ChartDataPoint {
    name: string
    value: number
    color: string
    [key: string]: string | number
}
