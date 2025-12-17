import { PayslipData } from "@/types/payslip"

export interface StoredPayslip extends PayslipData {
    id: string
    createdAt: string
    source?: {
        fileName?: string
    }
}

