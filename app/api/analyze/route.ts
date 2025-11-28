import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64Data = buffer.toString("base64")

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" })

        const prompt = `
      Analyze this French payslip (bulletin de paie) and extract the following information in a structured JSON format.
      Do not include markdown formatting (like \`\`\`json), just return the raw JSON object.
      
      Structure:
      {
        "period": "Month Year (e.g. Novembre 2023)",
        "employee": "Employee Name",
        "employer": "Employer Name",
        "summary": {
          "net": number (Net à payer),
          "gross": number (Total Brut),
          "taxes": number (Total charges salariales),
          "employerCost": number (Total chargé or estimate)
        },
        "details": [
          {
            "label": "Name of the line item (e.g. CSG, Assurance Maladie)",
            "amount": number (The amount deducted or added),
            "type": "deduction" | "income",
            "description": "A simplified explanation of what this charge is for in French (vulgarisation)"
          }
        ]
      }

      For the "details" array, group the main categories of taxes (Health, Retirement, Unemployment, CSG/CRDS) and provide a simplified description for each.
      Ensure all numbers are parsed correctly as floats.
    `

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: "application/pdf",
                },
            },
        ])

        const response = await result.response
        const text = response.text()

        // Clean up markdown if present
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim()
        try {
            const analysis = JSON.parse(jsonString)
            return NextResponse.json(analysis)
        } catch (e) {
            console.error("Failed to parse JSON:", jsonString)
            return NextResponse.json({ error: "Failed to parse AI response as JSON", details: text }, { status: 500 })
        }
    } catch (error: any) {
        console.error("Error processing PDF:", error)
        return NextResponse.json({
            error: "Failed to process PDF",
            details: error.message || String(error),
            stack: error.stack
        }, { status: 500 })
    }
}
