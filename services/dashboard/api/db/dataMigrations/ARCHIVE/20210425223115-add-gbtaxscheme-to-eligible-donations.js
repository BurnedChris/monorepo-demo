export default async ({ db }) => {
  const taxSchemeGBDeclarations = await db.taxSchemeGBDeclaration.findMany()

  for (const taxSchemeGBDeclaration of taxSchemeGBDeclarations) {
    await db.donation.updateMany({
      where: {
        AND: {
          supporterId: taxSchemeGBDeclaration.supporterId,
          teamId: taxSchemeGBDeclaration.teamId,
        },
      },
      data: {
        taxSchemeGBDeclarationId: taxSchemeGBDeclaration.id,
        agreedToGBTaxScheme: true,
        taxSchemeGBDeclarationStatus: 'UNCLAIMED',
      },
    })
  }
}
