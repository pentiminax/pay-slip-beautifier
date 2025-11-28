import { motion } from "framer-motion"

export function HeroSection() {
    return (
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
                Upload your French payslip and get a clear, visualized breakdown of your
                salary, taxes, and benefits. No more confusion.
            </p>
        </motion.div>
    )
}
