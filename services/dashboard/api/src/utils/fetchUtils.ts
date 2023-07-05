import fetch from 'node-fetch'
import { checkoutContext, requestContext } from 'src/contexts'
import { env } from 'src/env'
import { db } from 'src/lib/db'
import Sentry from 'src/lib/sentry'
import { signToken } from 'src/middlewares/sign/signToken'

const baseUrl = env.EF_PAYMENT_API_URL

export async function getGatewayPage(
  gatewayPageId: string = checkoutContext().gatewayPage.id
) {
  return await db.gatewayPage.findUnique({
    where: {
      id: gatewayPageId,
    },
    include: {
      account: true,
      domain: true,
      team: true,
    },
  })
}

type PaymentAPIFetchRequest = {
  endpoint: string
  liveMode: boolean
  method: 'get' | 'post'
  queryParams?: { [key: string]: string | number | boolean | Date }
  body?: Record<string, any>
  resolvedTokenParams?: Record<string, any> & { gatewayPageId: string }
  unresolvedTokenParams?: string[]
  headers?: Record<string, string>
  baseUrlOverride?: string
}

export async function fetchFromAPI({
  endpoint,
  liveMode,
  method,
  queryParams,
  body,
  resolvedTokenParams,
  unresolvedTokenParams,
  headers,
  baseUrlOverride,
}: PaymentAPIFetchRequest) {
  const queryParamsString = queryParams
    ? Object.keys(queryParams)
        .filter((key) => queryParams[key] !== undefined)
        .map((key) => `&${key}=${queryParams[key]}`)
        .join('')
    : ''

  const url = `${
    baseUrlOverride || baseUrl
  }/${endpoint}?liveMode=${liveMode}${queryParamsString}`

  headers = {
    'Content-Type': 'application/json',
    authorization: requestContext().authJWT,
    'auth-provider': requestContext().authProvider,
    ...headers,
  }

  Sentry.addBreadcrumb({
    category: 'context',
    message: 'sent request to payment api',
    level: 'info',
    data: {
      url,
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    },
  })

  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers,
  })

  const parsedRes = await res.json()

  // Only generate token if some token params are supplied
  if (resolvedTokenParams || unresolvedTokenParams) {
    // Combine resolved and unresolved token params to build gateway token
    const token = await signToken({
      type: 'checkout',
      ...resolvedTokenParams,
      ...Object.fromEntries(
        unresolvedTokenParams.map((param) => [param, parsedRes[param]])
      ),
    })

    return {
      ...parsedRes,
      token,
    }
  }

  return parsedRes
}
