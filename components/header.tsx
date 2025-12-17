import Link from "next/link"
import { ApiKeyModal } from "@/components/api-key-modal"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="absolute top-0 left-0 w-full z-50 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="font-bold text-xl tracking-tight">
                    PaySlip<span className="text-primary">Beautifier</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost">
                        <Link href="/dashboard">Historique</Link>
                    </Button>
                    <ApiKeyModal />
                </div>
            </div>
        </header>
    )
}
