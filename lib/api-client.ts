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

    const headers: HeadersInit = {}
    const apiKey = localStorage.getItem("gemini_api_key")
    if (apiKey) {
        headers["X-Gemini-API-Key"] = apiKey
    }

    const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
        headers,
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
