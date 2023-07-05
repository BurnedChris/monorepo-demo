type SignCheckoutTokenPorps = {
  type: 'checkout'
  donationId?: string
  gatewayPageId: string
}

type SignBotTokenProps = {
  type: 'bot'
  teamId: string
  forceEmail?: boolean
}

type SignClerkTokenProps = {
  type: 'clerk'
}

export type SignTokenProps =
  | SignCheckoutTokenPorps
  | SignBotTokenProps
  | SignClerkTokenProps

export type RawAuthHeaders = {
  'auth-provider': SignTokenProps['type']
  authorization: string
}

export type TokenMiddlewareProps = {
  type: SignTokenProps['type']
  gatewayPageId?: string
  donationId?: string
}
