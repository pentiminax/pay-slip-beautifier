"use client"

import { PayslipData } from "@/types/payslip"
import { StoredPayslip } from "@/types/history"

const HISTORY_KEY = "payslip_history_v1"
const LEGACY_SINGLE_KEY = "payslipData"
const MAX_ITEMS = 25
const HISTORY_CHANGED_EVENT = "payslip_history_changed"

type HistoryEnvelopeV1 = {
    version: 1
    items: StoredPayslip[]
}

let cachedRaw: string | null = null
let cachedItems: StoredPayslip[] = []

function isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined"
}

function safeJsonParse<T>(value: string | null): T | null {
    if (!value) return null
    try {
        return JSON.parse(value) as T
    } catch {
        return null
    }
}

function generateId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID()
    }
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function normalize(items: StoredPayslip[]): StoredPayslip[] {
    return [...items]
        .filter(Boolean)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, MAX_ITEMS)
}

function readEnvelope(): HistoryEnvelopeV1 {
    const fallback: HistoryEnvelopeV1 = { version: 1, items: [] }
    if (!isBrowser()) return fallback

    const raw = localStorage.getItem(HISTORY_KEY)
    if (raw === cachedRaw) {
        return { version: 1, items: cachedItems }
    }

    const parsed = safeJsonParse<HistoryEnvelopeV1>(raw)
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.items)) {
        cachedRaw = raw
        cachedItems = []
        return fallback
    }

    const normalized = normalize(parsed.items)
    cachedRaw = raw
    cachedItems = normalized
    return { version: 1, items: normalized }
}

function writeEnvelope(envelope: HistoryEnvelopeV1): void {
    if (!isBrowser()) return
    const normalized: HistoryEnvelopeV1 = { version: 1, items: normalize(envelope.items) }
    const raw = JSON.stringify(normalized)
    localStorage.setItem(HISTORY_KEY, raw)
    cachedRaw = raw
    cachedItems = normalized.items
    window.dispatchEvent(new Event(HISTORY_CHANGED_EVENT))
}

function migrateLegacySinglePayslip(): void {
    if (!isBrowser()) return
    if (localStorage.getItem(HISTORY_KEY)) return

    const legacy = safeJsonParse<PayslipData>(localStorage.getItem(LEGACY_SINGLE_KEY))
    if (!legacy) return

    const migrated: StoredPayslip = {
        ...legacy,
        id: generateId(),
        createdAt: new Date().toISOString(),
        source: {},
    }

    writeEnvelope({ version: 1, items: [migrated] })
    localStorage.removeItem(LEGACY_SINGLE_KEY)
}

export function getPayslips(): StoredPayslip[] {
    migrateLegacySinglePayslip()
    return readEnvelope().items
}

export function getPayslip(id: string): StoredPayslip | null {
    const items = getPayslips()
    return items.find((p) => p.id === id) ?? null
}

export function addPayslip(data: PayslipData, options?: { fileName?: string }): StoredPayslip {
    const envelope = readEnvelope()
    const entry: StoredPayslip = {
        ...data,
        id: generateId(),
        createdAt: new Date().toISOString(),
        source: options?.fileName ? { fileName: options.fileName } : undefined,
    }

    const next = { version: 1, items: [entry, ...envelope.items] }
    try {
        writeEnvelope(next)
        return entry
    } catch (error: unknown) {
        const errorName = error instanceof Error ? error.name : undefined
        const isQuotaError = errorName === "QuotaExceededError" || errorName === "NS_ERROR_DOM_QUOTA_REACHED"

        if (isQuotaError) {
            const trimmed = { version: 1 as const, items: [entry, ...envelope.items].slice(0, 5) }
            writeEnvelope(trimmed)
            return entry
        }
        throw error
    }
}

export function deletePayslip(id: string): void {
    const envelope = readEnvelope()
    writeEnvelope({ version: 1, items: envelope.items.filter((p) => p.id !== id) })
}

export function clearPayslips(): void {
    if (!isBrowser()) return
    localStorage.removeItem(HISTORY_KEY)
    window.dispatchEvent(new Event(HISTORY_CHANGED_EVENT))
}

export function subscribeToPayslipHistoryChanges(callback: () => void): () => void {
    if (!isBrowser()) return () => { }

    const handler = () => callback()
    window.addEventListener(HISTORY_CHANGED_EVENT, handler)
    window.addEventListener("storage", handler)
    return () => {
        window.removeEventListener(HISTORY_CHANGED_EVENT, handler)
        window.removeEventListener("storage", handler)
    }
}
