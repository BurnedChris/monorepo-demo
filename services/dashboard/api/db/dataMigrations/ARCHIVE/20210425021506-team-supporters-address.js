import idNumberAlphabet from 'api/src/utils/customAlphabet'

export default async ({ db }) => {
  const teamSupporters = await db.teamSupporter.findMany()

  for (const teamSupporter of teamSupporters) {
    await db.teamSupporter.update({
      where: {
        id: teamSupporter.id,
      },
      data: {
        address: {
          create: {
            id: `sa_${idNumberAlphabet()}`,
            city: teamSupporter.city,
            country: teamSupporter.country,
            line1: teamSupporter.line1,
            line2: teamSupporter.line2,
            postalCode: teamSupporter.postalCode,
            state: teamSupporter.state,
          },
        },
      },
    })
  }
}
