import { db } from 'api/src/lib/db'
import idNumberAlphabet from 'api/src/utils/customAlphabet'

export default async () => {
  const teams = await db.team.findMany()

  for (const element of teams) {
    const newTeamToggle = await db.team.update({
      where: {
        id: element.id,
      },
      data: {
        teamToggle: {
          create: {
            id: `tt_${await idNumberAlphabet()}`,
          },
        },
      },
    })
  }
}
