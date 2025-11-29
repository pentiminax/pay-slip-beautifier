import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                AI-Powered Payslip Analyzer
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Understand Your <span className="text-primary">Payslip</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your payslip and get a clear, visualized breakdown of your
                salary, taxes, and benefits. No more confusion.
            </p>

            <div className="flex justify-center">
                <Link href="/demo">
                    <Button variant="link" className="text-muted-foreground hover:text-primary">
                        Try with a demo payslip <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    )
}
