"use client"

import { useSyncExternalStore } from "react"
import { StoredPayslip } from "@/types/history"
import { getPayslips, subscribeToPayslipHistoryChanges } from "@/lib/storage"

const EMPTY_HISTORY: StoredPayslip[] = []

export function usePayslipHistory(): StoredPayslip[] {
    return useSyncExternalStore(
        subscribeToPayslipHistoryChanges,
        getPayslips,
        () => EMPTY_HISTORY
    )
}
