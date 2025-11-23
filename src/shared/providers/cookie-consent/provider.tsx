'use client'

import { CookieConsent } from '@/shared/ui/cookie-consent'
import { createContext, useCallback, useMemo, useState } from 'react'

import { readConsentClient, writeConsentClient } from './storage'
import { type CookieConsentValue, defaultCookieConsent } from './types'

interface CookieConsentCtx {
	consent: CookieConsentValue
	setConsent: (consent: CookieConsentValue) => void
	acceptAll: () => void
	declineAll: () => void
	openSettings: () => void
	isSettingsOpen: boolean
}
export const CookieConsentContext = createContext<CookieConsentCtx | null>(null)

export const CookieConsentProvider = ({
	children,
	initialConsent,
}: {
	children: React.ReactNode
	initialConsent?: CookieConsentValue | null
}) => {
	const [consent, setConsentState] = useState<CookieConsentValue>(
		initialConsent ?? readConsentClient() ?? defaultCookieConsent,
	)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const setConsent = useCallback((consent: CookieConsentValue) => {
		setConsentState(consent)
		writeConsentClient(consent)
	}, [])

	const acceptAll = useCallback(() => {
		setConsent({ necessary: true, analytics: true, decided: true })
		setIsSettingsOpen(false)
	}, [setConsent])

	const declineAll = useCallback(() => {
		setConsent({ necessary: true, analytics: false, decided: true })
		setIsSettingsOpen(false)
	}, [setConsent])

	const openSettings = useCallback(() => {
		setIsSettingsOpen(true)
	}, [])

	const value = useMemo(
		() => ({ consent, setConsent, acceptAll, declineAll, openSettings, isSettingsOpen }),
		[consent, setConsent, acceptAll, declineAll, openSettings, isSettingsOpen],
	)

	return (
		<CookieConsentContext.Provider value={value}>
			<CookieConsent variant='small' forceOpen={isSettingsOpen} />
			{children}
		</CookieConsentContext.Provider>
	)
}

