import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        // In a real app, we would parse the PDF here.
        // For this demo, we'll return a high-fidelity mock analysis
        // to demonstrate the UI and visualization capabilities.

        // Mock data
        const net = 2450.50
        const brut = 3200.00
        const taxes = brut - net

        const analysis = {
            period: "Novembre 2023",
            employee: "John Doe",
            employer: "Acme Corp",
            summary: {
                net: net,
                gross: brut,
                taxes: taxes,
                employerCost: brut * 1.45 // Estimate
            },
            details: [
                { label: "Salaire de base", amount: brut, type: "income" },
                { label: "CSG/CRDS", amount: taxes * 0.3, type: "deduction", description: "Contribution Sociale Généralisée / Contribution au Remboursement de la Dette Sociale. Sert à financer la sécurité sociale." },
                { label: "Assurance Maladie", amount: taxes * 0.1, type: "deduction", description: "Couvre vos frais de santé." },
                { label: "Retraite", amount: taxes * 0.4, type: "deduction", description: "Cotisations pour votre future retraite." },
                { label: "Chômage", amount: taxes * 0.1, type: "deduction", description: "Assurance en cas de perte d'emploi." },
                { label: "Prévoyance", amount: taxes * 0.1, type: "deduction", description: "Couverture complémentaire (décès, invalidité)." }
            ]
        }

        return NextResponse.json(analysis)
    } catch (error) {
        console.error("Error processing PDF:", error)
        return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 })
    }
}
