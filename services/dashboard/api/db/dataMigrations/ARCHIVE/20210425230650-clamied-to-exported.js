export default async ({ db }) => {
  // Migration here...

  const taxSchemeGBDeclarations = await db.taxSchemeGBDeclaration.findMany({
    where: {
      status: 'claimed',
    },
  })

  // go through each
  for (const taxSchemeGBDeclaration of taxSchemeGBDeclarations) {
    // if it just has one address

    await db.donation.updateMany({
      where: {
        taxSchemeGBDeclarationId: taxSchemeGBDeclaration.id,
        teamId: taxSchemeGBDeclaration.teamId,
      },
      data: {
        taxSchemeGBDeclarationStatus: 'EXPORTED',
      },
    })
  }
}
