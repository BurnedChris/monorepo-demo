import { parseFullName } from 'parse-full-name'

export default async ({ db }) => {
  const supporters = await db.supporter.findMany()

  for (const supporter of supporters) {
    const { title, first, middle, last } = parseFullName(supporter.name)

    await db.supporter.update({
      where: {
        id: supporter.id,
      },
      data: {
        title,
        firstName: first,
        middleName: middle,
        lastName: last,
      },
    })
  }

  //------------------------

  const taxSchemeGBDeclarations = await db.taxSchemeGBDeclaration.findMany()

  for (const taxSchemeGBDeclaration of taxSchemeGBDeclarations) {
    const { title, first, middle, last } = parseFullName(
      taxSchemeGBDeclaration.name
    )

    await db.taxSchemeGBDeclaration.update({
      where: {
        id: taxSchemeGBDeclaration.id,
      },
      data: {
        title,
        firstName: first,
        middleName: middle,
        lastName: last,
      },
    })
  }
}
