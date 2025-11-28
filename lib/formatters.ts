/**
 * Format a number as EUR currency
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
    }).format(amount)
}

/**
 * Calculate percentage of a value relative to a total
 */
export function calculatePercentage(value: number, total: number): string {
    if (total === 0) return "0.0"
    return ((value / total) * 100).toFixed(1)
}
