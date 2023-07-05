import type { PrismaClient } from '@prisma/client'

export default async ({ db }: { db: PrismaClient }) => {
  // Migration here...

  const donations = await db.donation.findMany()

  for (const element of donations) {
    const findLinkId = await db.link.findUnique({
      where: {
        shortLink: element.linkId,
      },
    })

    await db.donation.update({
      where: {
        id: element.id,
      },
      data: {
        linkId: findLinkId.id,
      },
    })
  }
  const donationsSubscription = await db.donationSubscription.findMany()

  for (const element of donationsSubscription) {
    const findLinkId = await db.link.findUnique({
      where: {
        shortLink: element.linkId,
      },
    })

    await db.donationSubscription.update({
      where: {
        id: element.id,
      },
      data: {
        linkId: findLinkId.id,
      },
    })
  }
}
