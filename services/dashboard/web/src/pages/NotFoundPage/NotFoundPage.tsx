/* eslint-disable i18next/no-literal-string, tailwindcss/no-custom-classname */
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { Crisp } from 'crisp-sdk-web'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'src/auth'
import MainLayout from 'src/layouts/MainLayout'
import SEO from 'src/shared/SEO'

export const NotFoundComponent = () => {
  const { t } = useTranslation('common')
  const location = isBrowser
    ? window.location.origin
    : 'https://dashboard.everfund.com'

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `.text-center{text-align:center}.error-code{color:#4f46e5;font-size:1rem;line-height:1.5rem;font-weight:600}.dark .error-code{color:#009681}.title{margin-top:1rem;color:#475569;font-size:1.875rem;line-height:2.25rem;font-weight:700;letter-spacing:-.025em}@media (min-width:640px){main{padding-top:8rem;padding-bottom:8rem}.title{font-size:3rem;line-height:1}}.error-text{margin-top:1.5rem;color:#1e293b;font-size:1rem;line-height:1.75rem}.button-1,.dark .button-2,.dark .error-text{color:#fff}.button-1,.button-2{font-size:.875rem;line-height:1.25rem;font-weight:600}.button-container{display:flex;margin-top:2.5rem;justify-content:center;align-items:center;column-gap:1.5rem}.button-1{padding:.625rem .875rem;background-color:#009681;border-radius:.375rem;box-shadow:0 1px 2px 0 rgba(0,0,0,.05)}.button-1:hover{background-color:#005e51}.button-2{color:#111827}`,
        }}
      />
      <div className="text-center">
        <h1 className="title">{t('pageNotFound.404Error')}</h1>
        <p className="error-text">{t('pageNotFound.description')}</p>
        <div className="button-container">
          <a href={location} className="button-1">
            Go back home
          </a>
          <button className="button-2" onClick={() => Crisp.chat.open()}>
            Contact support <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <MainLayout>
        <SEO title="Page Not Found" />
        <NotFoundComponent />
      </MainLayout>
    )
  }

  const location = isBrowser
    ? window.location.origin
    : 'https://dashboard.everfund.com'

  return (
    <>
      <SEO title="Page Not Found" />
      <style
        dangerouslySetInnerHTML={{
          __html: `#redwood-app,#overlay-container,body,html{height:100%}html *{box-sizing:border-box}main{display:grid;padding:6rem 1.5rem;background-color:#fff;place-items:center;min-height:100%}.dark main{background:#3b4252}@media (min-width:1024px){main{padding-left:2rem;padding-right:2rem}}.text-center{text-align:center}.error-code{color:#4f46e5;font-size:1rem;line-height:1.5rem;font-weight:600}.dark .error-code{color:#009681}.title{margin-top:1rem;color:#475569;font-size:1.875rem;line-height:2.25rem;font-weight:700;letter-spacing:-.025em}@media (min-width:640px){main{padding-top:8rem;padding-bottom:8rem}.title{font-size:3rem;line-height:1}}.error-text{margin-top:1.5rem;color:#1e293b;font-size:1rem;line-height:1.75rem}.button-1,.dark .button-2,.dark .error-text{color:#fff}.button-1,.button-2{font-size:.875rem;line-height:1.25rem;font-weight:600}.button-container{display:flex;margin-top:2.5rem;justify-content:center;align-items:center;column-gap:1.5rem}.button-1{padding:.625rem .875rem;background-color:#009681;border-radius:.375rem;box-shadow:0 1px 2px 0 rgba(0,0,0,.05)}.button-1:hover{background-color:#005e51}.button-2{color:#111827}`,
        }}
      />
      <main>
        <div className="text-center">
          <h1 className="title">This page does not exist.</h1>
          <p className="error-text">
            The page you are looking for could not be found.
          </p>
          <div className="button-container">
            <a href={location} className="button-1">
              Go back home
            </a>
            <button className="button-2" onClick={() => Crisp.chat.open()}>
              Contact support <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
