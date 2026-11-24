import Script from 'next/script'
import { ADS_ID } from './googleAdsConfig'

/** Site-wide Google tag (gtag.js). Rendered once from the root layout. */
export function GoogleAdsTag() {
  return (
    <>
      {/* Set up dataLayer/gtag before the page hydrates, so the purchase event
          can be queued even if gtag.js itself hasn't finished loading. */}
      <Script id="google-ads-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ADS_ID}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
