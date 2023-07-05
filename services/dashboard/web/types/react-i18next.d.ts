// import all namespaces (for the default language, only)
import 'react-i18next'

import authentication from '../src/locales/en/authentication.json'
import common from '../src/locales/en/common.json'
import donations from '../src/locales/en/donations.json'
import gateway from '../src/locales/en/gateway.json'
import homePage from '../src/locales/en/homePage.json'
import onboarding from '../src/locales/en/onboarding.json'
import settings from '../src/locales/en/settings.json'

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'common'
    // custom resources type
    resources: {
      authentication: typeof authentication
      common: typeof common
      donations: typeof donations
      gateway: typeof gateway
      homePage: typeof homePage
      onboarding: typeof onboarding
      settings: typeof settings
    }
  }
}
