"use client"

import { useState } from "react"
import { Upload } from "@/components/upload"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleFileSelect = async (file: File) => {
    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create a FormData object to send the file
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Analysis failed")
      }

      const data = await response.json()

      // Store data in localStorage or state management to pass to dashboard
      // For simplicity in this demo, we'll just log it and navigate
      localStorage.setItem("payslipData", JSON.stringify(data))
      router.push("/dashboard")

    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Failed to analyze payslip. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-3xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            AI-Powered Payslip Analyzer
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Understand Your <span className="text-primary">Paycheck</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your French payslip and get a clear, visualized breakdown of your salary, taxes, and benefits. No more confusion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm p-8 rounded-2xl border shadow-lg"
        >
          <Upload onFileSelect={handleFileSelect} isUploading={isUploading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Instant Analysis</span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
