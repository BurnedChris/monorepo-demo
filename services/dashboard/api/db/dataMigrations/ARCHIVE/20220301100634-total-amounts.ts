import type { PrismaClient } from '@prisma/client'

export default async ({ db }: { db: PrismaClient }) => {
  // Migration here...

  // ==================================================
  // Adding up total donation ammounts into link total
  // ==================================================
  const donations = await db.donation.findMany({
    where: {
      status: 'succeeded',
    },
  })

  for (const element of donations) {
    const findLinkId = await db.link.findUnique({
      where: {
        id: element.linkId,
      },
    })

    await db.link.update({
      where: {
        id: findLinkId.id,
      },
      data: {
        totalDonationAmount:
          Number(findLinkId.totalDonationAmount) +
          Number(
            element.isCoveringFee
              ? element.baseAmount
              : element.notCoverNonProfitReceives
          ),
        totalGiftAidAmount: element.taxSchemeGBDeclarationStatus
          ? Number(findLinkId.totalGiftAidAmount) +
            Math.round(
              Number(
                ((element.isCoveringFee
                  ? element.baseAmount
                  : element.notCoverNonProfitReceives) /
                  100) *
                  25
              )
            )
          : findLinkId.totalGiftAidAmount,
      },
    })
  }
  // ==================================================
  // Added bg color to link templates instead of using white bg
  // ==================================================
  const linkTemplatesWithWhiteBg = await db.donationTemplate.findMany({
    where: {
      imageBackground:
        'https://ik.imagekit.io/everfund/links/white-bg_v8V4chILb.png',
    },
  })

  for (const element of linkTemplatesWithWhiteBg) {
    await db.donationTemplate.update({
      where: {
        id: element.id,
      },
      data: {
        imageBackgroundColor: '#ffffff',
        imageBackground: null,
      },
    })
  }

  // https://ik.imagekit.io/everfund/links/white-bg_v8V4chILb.png
}
