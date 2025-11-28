import { motion } from "framer-motion"

export function FeaturesBadges() {
    return (
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
    )
}
