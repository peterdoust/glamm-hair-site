'use client'

import { useEffect } from 'react'
import { PURCHASE_SEND_TO } from './googleAdsConfig'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Fires the Google Ads purchase conversion once per order. Runs on mount, so it
 * works whether checkout reached the success page by client navigation or by a
 * full page load (3-D Secure redirect).
 */
export default function PurchaseConversion({
  orderNumber,
  value,
  currency,
}: {
  orderNumber: string
  value: number
  currency: string
}) {
  useEffect(() => {
    // A refresh or revisit of the page shouldn't report the order again.
    // (Google also de-duplicates on transaction_id.)
    const key = `gads-conversion-${orderNumber}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      /* storage blocked: rely on transaction_id de-duplication */
    }

    const params = {
      send_to: PURCHASE_SEND_TO,
      value,
      currency: currency.toUpperCase(),
      transaction_id: orderNumber,
    }
    if (window.gtag) {
      window.gtag('event', 'conversion', params)
    } else {
      // Same queue format gtag() uses; gtag.js processes it once loaded.
      const dl = (window.dataLayer = window.dataLayer || [])
      ;(function (..._args: unknown[]) {
        // eslint-disable-next-line prefer-rest-params
        dl.push(arguments)
      })('event', 'conversion', params)
    }
  }, [orderNumber, value, currency])

  return null
}
