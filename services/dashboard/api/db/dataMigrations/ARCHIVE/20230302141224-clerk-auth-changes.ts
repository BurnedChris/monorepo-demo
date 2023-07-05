import { users as clerk } from '@clerk/clerk-sdk-node'
import type { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'

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

const idNumberAlphabet = customAlphabet(
  '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  24
)

const createDevAssets = async ({ db, firstName, clerkUserId }) => {
  const donationTemplateId = `lt_${await idNumberAlphabet()}`
  const donationWidgetId = `l_${await idNumberAlphabet()}`
  const createNewTeamMemberId = `tm_${await idNumberAlphabet()}`
  const teamId = `t_${await idNumberAlphabet()}`

  const team = await db.team.create({
    data: {
      id: teamId,
      name: `${firstName}'s team`,
      publicMetadata: {
        donationWidgetId,
        donationTemplateId,
        onboarding: {
          completed: false,
          devHasEditedTemplate: false,
          devHasEditedLink: false,
        },
      },
    },
  })
  await db.teamMember.create({
    data: {
      id: createNewTeamMemberId,
      teamMemberRole: {
        connect: {
          //super owner role
          id: 'tmr_YMuAxYd2LN684oXuzcjrf5iy',
        },
      },
      team: {
        connect: {
          id: team.id,
        },
      },
    },
  })
  const donationTemplate = await db.donationTemplate.create({
    data: {
      id: donationTemplateId,
      name: 'My first Template',
      colorAccent: '#E65F66',
      colorBackground: '#252F3F',
      showDonationGoals: false,
      imageBackgroundColor: '#FFFFFF',
      imageBackground: undefined,
      imageLogo:
        'https://ik.imagekit.io/everfund/links/everfund_MRlMhgmeaq.png',
      imageLogoSize: 'sm',
      imageOGImage: undefined,
      team: {
        connect: { id: team.id },
      },
    },
  })

  await db.link.create({
    data: {
      id: donationWidgetId,
      code: await idNumberAlphabet(),
      account: {
        connect: {
          id: 'acct_1Luz0n4CDXeLxUxZ',
        },
      },
      productType: 'widget',
      canCollectGiftAid: false,
      canCollectMarketingInformation: false,
      countryCurrencyCode: 'GBP',
      countryISO: 'GB',
      countryLanguageTag: 'en-GB',
      liveMode: false,
      domain: {
        connect: {
          id: 'ld_J6ZOOfcUQVupkIofTAptVlqB',
        },
      },
      template: {
        connect: { id: donationTemplate.id },
      },
      textStory:
        "Here is where you'll describe what your cause or campaign is, why you need help from donors, and what it will go towards. You should stay under two short paragraphs to ensure your message gets across to potential donors without them reading too much.",
      textThankYou:
        'Say thanks to your donors here. Make this a short sentence or two, ensuring donors their money will help your cause',
      team: {
        connect: { id: team.id },
      },
    },
  })

  const currentTeamMember = await db.teamMember.findUnique({
    where: {
      id: createNewTeamMemberId,
    },
    include: {
      teamMemberRole: true,
      team: true,
    },
  })

  const userData = await db.user.findFirst({
    where: { clerkUserId: clerkUserId },
    include: {
      teamInvitations: true,
      teamMembers: true,
    },
  })

  const publicMetadata = {
    currentTeam: {
      teamCountryISO: currentTeamMember?.team?.teamCountryISO,
      name: currentTeamMember?.team?.name,
      teamCountryLanguageTag: currentTeamMember?.team?.teamCountryLanguageTag,
      teamCountryCurrencyCode: currentTeamMember?.team?.teamCountryCurrencyCode,
      teamOrganisationId: currentTeamMember?.team?.teamOrganisationId,
    },
    invitations: userData?.teamInvitations,
  }

  const a = userData?.teamMembers
  // Metadata saved on the user, that is only visible to your Backend API.
  const privateMetadata = {
    // try not expose these to the front end
    currentTeamId: currentTeamMember.team.id,
    currentTeamMemberId: currentTeamMember.id,
    teamMembers: a,
  }

  const clerkReturns = await clerk.updateUserMetadata(clerkUserId, {
    publicMetadata,
    privateMetadata,
  })

  const data = {
    publicMetadata: clerkReturns.publicMetadata,
    privateMetadata: clerkReturns.privateMetadata,
  }

  // Once clerk returns the new metadata that has been merged, we than set it to the
  // everfund DB as a backup
  await db.user.update({
    where: { clerkUserId: clerkUserId },
    data,
  })
}

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
          currentTeam:
            (everfundUser.currentTeam && {
              teamCountryISO: everfundUser.currentTeam?.teamCountryISO,
              name: everfundUser.currentTeam.name,
              teamCountryLanguageTag:
                everfundUser.currentTeam?.teamCountryLanguageTag,
              teamCountryCurrencyCode:
                everfundUser.currentTeam?.teamCountryCurrencyCode,
              teamOrganisationId:
                everfundUser.currentTeam?.teamOrganisationId || undefined,
            }) ||
            undefined,

          // when we create clerk user
          agreedToTermsAndConditions: undefined,
          agreedToPrivacyPolicy: undefined,
          // userType is set in everfund db
          userType: everfundUser.userType || undefined,
          // 0 - userType selected but nothing else
          // 1 - widget screen completed
          // 2 - view test donations screen completed -> Pass the user to the dashboard
          devOnboardingStatus:
            everfundUser.userType === 'developer' ? 0 : undefined,
          // check if they already have a payment destination
          //  if they do allow them to leave testMode
          canToggleLiveMode: everfundUser.currentTeam
            ?.teamPaymentDestinations[0]?.id
            ? true
            : false,
          liveMode: true,
        },
        privateMetadata: {
          currentTeamId: everfundUser.currentTeam?.id,
          currentTeamMemberId: everfundUser.teamMembers.find(
            (teamMember) => teamMember.teamId === everfundUser.currentTeam?.id
          )?.id, // only returns ID if present
        },
      }

      // check if user exists in Clerk
      if (everfundUser.clerkUserId) {
        // user exists in Clerk - so update user in Clerk
        await clerk.updateUser(everfundUser.clerkUserId, clerkData)

        if (
          everfundUser.userType === 'developer' &&
          everfundUser.teamMembers.length === 0
        ) {
          await createDevAssets({
            db,
            firstName: everfundUser.firstName,
            clerkUserId: everfundUser.clerkUserId,
          })
        }

        // developer has already played around with donations so skip
        if (
          everfundUser.userType === 'developer' &&
          everfundUser?.currentTeam?.donations.length !== 0
        ) {
          await clerk.updateUser(everfundUser.clerkUserId, {
            publicMetadata: { devOnboardingStatus: 2 },
          })
        }
      } else {
        // User does not exist in Clerk - so create user in Clerk
        const userEmail = everfundUser?.email

        const clerkUser = {
          ...clerkData,
          emailAddress: userEmail ? [userEmail] : undefined,
        }

        const test = await clerk.createUser(clerkUser)

        if (
          everfundUser.userType === 'developer' &&
          everfundUser.teamMembers.length === 0
        ) {
          await createDevAssets({
            db,
            firstName: everfundUser.firstName,
            clerkUserId: test.id,
          })
        }

        // developer has already played around with donations so skip
        if (
          everfundUser.userType === 'developer' &&
          everfundUser?.currentTeam?.donations.length !== 0
        ) {
          await clerk.updateUser(test.id, {
            publicMetadata: { devOnboardingStatus: 2 },
          })
        }
      }

      // if developer create basic donation link and template and team
      // skip if user is not a developer
      // also skip if they already have a donation link and template and team
      // devOnboardingStatus
      // if developer has no teamMembers then they have never joined a team

      await sleep(1000)
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
