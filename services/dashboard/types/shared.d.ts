import { TeamInvitation, TeamMember, UserTypeStatus } from 'api/types/graphql'

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type privateMetadata = {
  teamMembers?: TeamMember[]
}

export type publicMetadata = {
  agreedToTermsAndConditions: string | Date
  agreedToPrivacyPolicy: string | Date
  userType: UserTypeStatus
  currentTeam: {
    id: string
    teamMemberId: string
    teamCountryISO: string
    name: string
    teamCountryLanguageTag: string
    teamCountryCurrencyCode: string
    teamOrganisationId: string
  }
  invitations: TeamInvitation[]
  liveMode: boolean
  canToggleLiveMode: boolean
  devOnboardingStatus: number
  ipData?: {
    city: string
    timeZone: string
    language: string
    currency: string
  }
}

export type unsafeMetadata = unknown

declare global {
  interface UserPublicMetadata extends DeepPartial<publicMetadata> {}

  interface UserUnsafeMetadata extends unsafeMetadata {}
}

export type teamContext = {
  publicMetadata: {
    gatewayPageId: string
    gatewayPageCode: string
    gatewayTemplateId: string
    onboarding: {
      completed: boolean
      // legacy
      devHasEditedTemplate: boolean
      //legacy
      devHasEditedLink: boolean
      nonprofitHasEditedLink: boolean

      // come back to these
      onboardingDevHasEditedTemplate: boolean
      onboardingDevHasEditedLink: boolean
      onboardingCompleted: boolean
    }
  }
  privateMetadata: unknown
}
