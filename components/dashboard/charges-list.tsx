import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PayslipDetail } from "@/types/payslip"
import { ChargeItem } from "./charge-item"

interface ChargesListProps {
    details: PayslipDetail[]
}

export function ChargesList({ details }: ChargesListProps) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Comprendre vos charges</CardTitle>
                <CardDescription>
                    Explication simplifiée de chaque ligne de votre bulletin
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {details.map((item, index) => (
                        <ChargeItem key={index} item={item} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
