"use client"

import { motion } from "framer-motion"
import { Upload } from "@/components/upload"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesBadges } from "@/components/home/features-badges"
import { BackgroundDecoration } from "@/components/home/background-decoration"
import { usePayslipUpload } from "@/hooks/use-payslip-upload"

export default function Home() {
  const { isUploading, uploadPayslip } = usePayslipUpload()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
      <BackgroundDecoration />

      <div className="z-10 w-full max-w-3xl text-center space-y-8">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm p-8 rounded-2xl border shadow-lg"
        >
          <Upload onFileSelect={uploadPayslip} isUploading={isUploading} />
        </motion.div>

        <FeaturesBadges />
      </div>
    </main>
  )
}
