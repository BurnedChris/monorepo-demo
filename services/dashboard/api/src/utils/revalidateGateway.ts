import fetch from 'node-fetch'
import { env } from 'src/env'

export const revalidateGatewayUrls = async ({ domain, code }) => {
  if (env.PUBLIC_APPLICATION_ENVIRONMENT === 'production') {
    const validationUrl = new URL(
      '/api/revalidate?' +
        new URLSearchParams({
          domain: domain,
          code: code,
        }).toString(),
      env.PUBLIC_EF_GATEWAY_URL
    )

    return await fetch(validationUrl, {
      method: 'POST',
    })
  } else {
    return true
  }
}
