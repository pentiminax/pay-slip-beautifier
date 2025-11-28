import { useState } from "react"
import { useRouter } from "next/navigation"
import { analyzePayslip, ApiError } from "@/lib/api-client"

export function usePayslipUpload() {
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    const uploadPayslip = async (file: File) => {
        setIsUploading(true)

        try {
            // Simulate upload delay for better UX
            await new Promise((resolve) => setTimeout(resolve, 1500))

            const data = await analyzePayslip(file)

            // Store data in localStorage to pass to dashboard
            localStorage.setItem("payslipData", JSON.stringify(data))
            router.push("/dashboard")
        } catch (error) {
            console.error("Error uploading file:", error)

            const errorMessage = error instanceof ApiError
                ? error.message
                : "Failed to analyze payslip. Please try again."

            alert(errorMessage)
        } finally {
            setIsUploading(false)
        }
    }

    return {
        isUploading,
        uploadPayslip,
    }
}
