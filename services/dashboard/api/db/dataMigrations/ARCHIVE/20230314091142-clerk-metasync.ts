import { users as clerk } from '@clerk/clerk-sdk-node'
import type { PrismaClient } from '@prisma/client'

import {
  DeepPartial,
  privateMetadata,
  publicMetadata,
} from '../../../types/shared'

type TypedMirrorMetadata = DeepPartial<{
  externalId?: string
  firstName?: string
  lastName?: string
  publicMetadata: publicMetadata
  privateMetadata: privateMetadata
}>

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// alL users are now in clerk and we are not setting team members
export default async ({ db }: { db: PrismaClient }) => {
  try {
    // get all users from everfund db not clerk.
    const users = await db.user.findMany({
      include: {
        currentTeam: {
          include: {
            teamPaymentDestinations: true,
            links: true,
            templates: true,
            donations: true,
          },
        },
        teamMembers: {
          include: {
            team: {
              include: {
                teamPaymentDestinations: true,
              },
            },
          },
        },
      },
    })

    // loop through everfund users
    for (const everfundUser of users) {
      // if user has name then create name object
      // else leave it undefined
      const name =
        everfundUser.firstName && everfundUser.lastName
          ? {
              firstName: everfundUser.firstName,
              lastName: everfundUser.lastName,
            }
          : undefined

      // create user object for clerk
      const clerkData: TypedMirrorMetadata = {
        // set clerk externalId as everfund id
        externalId: everfundUser.id,

        // onboarding is checking for full name not firstname and lastname as the const above shows
        // if first name and last name are present then set name
        ...name,

        // this is setting clerks publicMetadata of the user
        publicMetadata: {
          currentTeam: everfundUser.currentTeam && {
            teamCountryISO: everfundUser.currentTeam?.teamCountryISO,
            name: everfundUser.currentTeam.name,
            teamCountryLanguageTag:
              everfundUser.currentTeam?.teamCountryLanguageTag,
            teamCountryCurrencyCode:
              everfundUser.currentTeam?.teamCountryCurrencyCode,
            teamOrganisationId:
              everfundUser.currentTeam?.teamOrganisationId || null,
          },

          // when we create clerk user
          agreedToTermsAndConditions: null,
          agreedToPrivacyPolicy: null,
          // userType is set in everfund db
          userType: everfundUser.userType || null,
          // 0 - userType selected but nothing else
          // 1 - widget screen completed
          // 2 - view test donations screen completed -> Pass the user to the dashboard
          devOnboardingStatus:
            everfundUser.userType === 'developer'
              ? !(
                  everfundUser?.currentTeam?.donations.length === 0 ||
                  everfundUser?.currentTeam?.donations.length === undefined
                )
                ? 0
                : 2
              : undefined,
          // check if they already have a payment destination
          //  if they do allow them to leave testMode
          canToggleLiveMode: everfundUser.currentTeam
            ?.teamPaymentDestinations[0]?.id
            ? true
            : false,
          liveMode: everfundUser.currentTeam?.teamPaymentDestinations[0]?.id
            ? true
            : false,
        },
        privateMetadata: {
          currentTeamId: everfundUser.currentTeam?.id || null,
          currentTeamMemberId:
            everfundUser.teamMembers.find(
              (teamMember) => teamMember.teamId === everfundUser.currentTeam?.id
            )?.id || null, // only returns ID if present
        },
      }

      // check if user exists in Clerk
      if (everfundUser.clerkUserId) {
        // user exists in Clerk - so update user in Clerk
        await clerk.updateUser(everfundUser.clerkUserId, clerkData)

        await db.user.update({
          where: {
            clerkUserId: everfundUser.clerkUserId,
          },
          data: {
            publicMetadata: clerkData.publicMetadata,
            privateMetadata: clerkData.privateMetadata,
          },
        })
        // developer has already played around with donations so skip
      }
      await sleep(100)
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
