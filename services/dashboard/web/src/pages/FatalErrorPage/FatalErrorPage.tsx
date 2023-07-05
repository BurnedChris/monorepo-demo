/* eslint-disable i18next/no-literal-string, tailwindcss/no-custom-classname */
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { Crisp } from 'crisp-sdk-web'

// Ensures that production builds do not include the error page
let RedwoodDevFatalErrorPage = undefined

if (import.meta.env.DEV) {
  RedwoodDevFatalErrorPage =
    require('@redwoodjs/web/dist/components/DevFatalErrorPage').DevFatalErrorPage
}

const ErrorPage = () => {
  const location = isBrowser
    ? window.location.origin
    : 'https://dashboard.everfund.com'

  return (
    <main>
      <style
        dangerouslySetInnerHTML={{
          __html: `#redwood-app,#overlay-container,body,html{height:100%}html *{box-sizing:border-box}main{display:grid;padding:6rem 1.5rem;background-color:#fff;place-items:center;min-height:100%}.dark main{background:#3b4252}@media (min-width:1024px){main{padding-left:2rem;padding-right:2rem}}.text-center{text-align:center}.error-code{color:#4f46e5;font-size:1rem;line-height:1.5rem;font-weight:600}.dark .error-code{color:#009681}.title{margin-top:1rem;color:#475569;font-size:1.875rem;line-height:2.25rem;font-weight:700;letter-spacing:-.025em}@media (min-width:640px){main{padding-top:8rem;padding-bottom:8rem}.title{font-size:3rem;line-height:1}}.error-text{margin-top:1.5rem;color:#1e293b;font-size:1rem;line-height:1.75rem}.button-1,.dark .button-2,.dark .error-text{color:#fff}.button-1,.button-2{font-size:.875rem;line-height:1.25rem;font-weight:600}.button-container{display:flex;margin-top:2.5rem;justify-content:center;align-items:center;column-gap:1.5rem}.button-1{padding:.625rem .875rem;background-color:#009681;border-radius:.375rem;box-shadow:0 1px 2px 0 rgba(0,0,0,.05)}.button-1:hover{background-color:#005e51}.button-2{color:#111827}`,
        }}
      />
      <div className="text-center">
        <h1 className="title">Something went wrong</h1>
        <p className="error-text">
          Please try refreshing your page. If the problem persists
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
  )
}

export default RedwoodDevFatalErrorPage || ErrorPage
