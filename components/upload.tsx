"use client"

import * as React from "react"
import { UploadCloud, FileText, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UploadProps {
    onFileSelect: (file: File) => void
    isUploading?: boolean
}

export function Upload({ onFileSelect, isUploading = false }: UploadProps) {
    const [dragActive, setDragActive] = React.useState(false)
    const [file, setFile] = React.useState<File | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file: File) => {
        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file")
            return
        }
        setFile(file)
        onFileSelect(file)
    }

    const removeFile = () => {
        setFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                {!file ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        key="upload-zone"
                    >
                        <div
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors duration-300 ease-in-out cursor-pointer overflow-hidden",
                                dragActive
                                    ? "border-primary bg-primary/5"
                                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                            )}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                        >
                            <input
                                ref={inputRef}
                                className="hidden"
                                type="file"
                                accept=".pdf"
                                onChange={handleChange}
                            />

                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                <div className="p-4 rounded-full bg-primary/10 mb-4 text-primary">
                                    <UploadCloud className="w-8 h-8" />
                                </div>
                                <p className="mb-2 text-sm font-medium text-foreground">
                                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PDF (max. 10MB)
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key="file-preview"
                        className="w-full"
                    >
                        <div className="relative flex items-center p-4 border rounded-xl bg-card shadow-sm">
                            <div className="p-3 rounded-lg bg-primary/10 text-primary mr-4">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            {!isUploading && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFile()
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                            {isUploading && (
                                <div className="flex items-center justify-center w-10 h-10">
                                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
