import { users as clerk } from '@clerk/clerk-sdk-node'
import type { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'

import {
  DeepPartial,
  privateMetadata,
  publicMetadata,
} from '../../../../types/shared'

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

//recursively delete all links and templates and team and teamMember

// const teamMembers = await db.teamMember.count({
//   where: {
//     team: {
//       id: undefined,
//     },
//   },
// })

//  const teamMembers = await db.team.count({
//   where: {
//     teamMembers: {
//       every: {
//       id: undefined,
//     }
//     },
//   },
// })
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

  // await db.teamMember.create({
  //   data: {
  //     id: createNewTeamMemberId,
  //     teamMemberRole: {
  //       connect: {
  //         //super owner role
  //         id: 'tmr_YMuAxYd2LN684oXuzcjrf5iy',
  //       },
  //     },
  //     team: {
  //       connect: {
  //         id: team.id,
  //       },
  //     },
  //   },
  // })

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
  //  await db.user.update({
  //    where: { clerkUserId: clerkUserId },
  //    data,
  //  })
}

export default async ({ db }: { db: PrismaClient }) => {
  // Migration here...
}
