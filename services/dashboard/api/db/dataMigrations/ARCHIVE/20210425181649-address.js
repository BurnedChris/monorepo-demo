export default async ({ db }) => {
  // get all the tax schemes
  const taxSchemeGBDeclarations = await db.taxSchemeGBDeclaration.findMany({
    include: {
      supporterAddress: true,
    },
  })

  // go through each
  for (const taxSchemeGBDeclaration of taxSchemeGBDeclarations) {
    // if it just has one address
    if (taxSchemeGBDeclaration.supporterAddress.length === 1) {
      const t = await db.taxSchemeGBDeclaration.update({
        where: {
          id: taxSchemeGBDeclaration.id,
        },
        data: {
          supporterAddressIdNEW: taxSchemeGBDeclaration.supporterAddress[0].id,
        },
      })

      console.log(t)
    }
  }
}
