import { PayslipData } from "@/types/payslip"

export class ApiError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message)
        this.name = "ApiError"
    }
}

/**
 * Analyze a payslip PDF file
 */
export async function analyzePayslip(file: File): Promise<PayslipData> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
            errorData.error || "Analysis failed",
            response.status
        )
    }

    return response.json()
}
