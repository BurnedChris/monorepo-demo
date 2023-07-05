import { User } from '@clerk/backend/dist/types/api'
import { AuthContextPayload } from '@redwoodjs/api'
import { requestContextHeaders } from 'src/contexts/addRequestContext'

import {
  privateMetadata,
  publicMetadata,
  unsafeMetadata,
} from '../../types/shared'
import {
  GatewayDomain,
  GatewayPage,
  Team,
  TeamPaymentDestination,
} from './graphql'
import { SignTokenProps } from './jwtTokens'

export type TypedUser = clerkDecoded | checkoutDecoded | botDecoded

export type clerkDecoded = User & {
  publicMetadata?: publicMetadata
  privateMetadata?: privateMetadata
  unsafeMetadata?: unsafeMetadata
  userImpersonated: boolean
  type: 'clerk'
}

export type GetCurrentUser = (
  decoded: TypedUser,
  raw: AuthContextPayload[1],
  req?: AuthContextPayload[2]
) => TypedUser | null

export type checkoutDecoded = {
  account: TeamPaymentDestination
  domain: GatewayDomain
  donationId?: string
  gatewayPage: GatewayPage
  team: Team
  type: 'checkout'
}

export type botDecoded = {
  type: 'bot'
}

export type requestContextReturn = {
  /*
   *The Currency of the viewer based on location.
   */
  currency: string
  /*
   * The IP address of the viewer that sent the request.
   */
  ipAddress: requestContextHeaders['x-forwarded-for']
  /*
   * The language of the viewer that sent the request.
   */
  language: string
  /*
   * The location of the viewer that sent the request. From CloudFront headers.
   */
  location: {
    country: requestContextHeaders['cloudfront-viewer-country']
    countryRegion: requestContextHeaders['cloudfront-viewer-country-region']
    postalCode: requestContextHeaders['cloudfront-viewer-postal-code']
    timeZone: requestContextHeaders['cloudfront-viewer-time-zone']
    viewerCity: requestContextHeaders['cloudfront-viewer-city']
  }
  /*
   * The origin of the viewer that sent the request.
   */
  origin: requestContextHeaders['origin']
  /*
   * The referer of the viewer that sent the request.
   */
  referer: requestContextHeaders['referer']
  /*
   * The user agent of the viewer that sent the request.
   */
  userAgent: requestContextHeaders['user-agent']
  authJWT: string | undefined
  authProvider: SignTokenProps['type']
}

declare module '@redwoodjs/graphql-server' {
  export interface GlobalContext {
    currentUser: clerkDecoded | checkoutDecoded | botDecoded
  }
}
