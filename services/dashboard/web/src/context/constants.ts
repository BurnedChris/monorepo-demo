import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import dayjs from 'dayjs'

export const MEDIA_QUERY = '(prefers-color-scheme: dark)'
export const LOCAL_STORAGE_TAG = 'ef-color-scheme'
export const MODE_DARK = 'dark'
export const MODE_LIGHT = 'light'
export const MODE_SYSTEM = 'system'

// used on footers etc for marketing back to main marketing website
export const EVERFUND_MARKETING_DOMAIN = 'everfund.com'
// eslint-disable-next-line @typescript-eslint/no-inferrable-types

// used for SEO Tag on the dashboard no api's use it
export const EVERFUND_DASHBOARD_DOMAIN = isBrowser
  ? window.location.origin
  : 'https://dashboard.everfund.com'

export const EVERFUND_API_DOMAIN = isBrowser ? window.RWJS_API_URL : undefined

// defined in config file not functions as multiple uppy hooks exist
// future proofing, cut uppy down to one custom everfund uppy hook
export const EVERFUND_UPPY_DOMAIN = EVERFUND_API_DOMAIN + '/uppy'

export const DEFAULT_DESCRIPTION =
  'Create, share and track high performance donation links and raise more from donors no matter where they are'

export const DEFAULT_SEO = '/ everfund.com'

export const LATEST_TERMS_AND_CONDITIONS = dayjs(new Date(2021, 4, 17))
export const LATEST_PRIVACY_POLICY = dayjs(new Date(2021, 4, 17))
