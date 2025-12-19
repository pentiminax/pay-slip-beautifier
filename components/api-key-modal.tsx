"use client"

import { useState } from "react"
import { Settings, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function ApiKeyModal() {
    const [apiKey, setApiKey] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenChange = (open: boolean) => {
        if (open) {
            const storedKey = localStorage.getItem("gemini_api_key") || ""
            setApiKey(storedKey)
        }
        setIsOpen(open)
    }

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem("gemini_api_key", apiKey.trim())
        } else {
            localStorage.removeItem("gemini_api_key")
        }
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>API Configuration</DialogTitle>
                    <DialogDescription>
                        Enter your Google Gemini API key to use your own quota.
                        The key is stored locally in your browser.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="apiKey">Gemini API Key</Label>
                        <div className="relative">
                            <Key className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="apiKey"
                                type="password"
                                placeholder="AIzaSy..."
                                className="pl-9"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Need a key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Get one here</a>.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
