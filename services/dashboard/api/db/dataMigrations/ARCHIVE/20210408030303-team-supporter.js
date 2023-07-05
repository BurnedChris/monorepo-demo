import idNumberAlphabet from 'api/src/utils/customAlphabet'

// do we have to do any sorting?
// spread object properties where...

export default async ({ db }) => {
  const teams = await db.team.findMany({
    include: {
      donations: {
        include: {
          supporter: {
            include: {
              addresses: {
                orderBy: {
                  updatedAt: 'desc',
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  })

  for (const team of teams) {
    for (const donation of team.donations) {
      const teamSupporter = await db.teamSupporter.findUnique({
        where: {
          teamId_supporterId: {
            teamId: team.id,
            supporterId: donation.supporterId,
          },
        },
      })

      if (!teamSupporter) {
        await db.teamSupporter.create({
          data: {
            id: `ts_${idNumberAlphabet()}`,
            title: donation.supporter.title,
            firstName: donation.supporter.firstName,
            middleName: donation.supporter.middleName,
            lastName: donation.supporter.lastName,
            email: donation.supporter.email,
            phone: donation.supporter.phone,
            // relations
            address: {
              create: {
                id: `sa_${idNumberAlphabet()}`,
                line1: donation.supporter.addresses[0].line1,
                line2: donation.supporter.addresses[0].line2,
                city: donation.supporter.addresses[0].city,
                country: donation.supporter.addresses[0].country,
                postalCode: donation.supporter.addresses[0].postalCode,
                state: donation.supporter.addresses[0].state,
              },
            },
            team: {
              connect: {
                id: team.id,
              },
            },
            supporter: {
              connect: {
                id: donation.supporterId,
              },
            },
            // anon
            anonymousActivity: donation.supporter.anonymousActivity,
            anonymousColors: donation.supporter.anonymousColors,
            anonymousCode: donation.supporter.anonymousCode,
          },
        })
      }
    }
  }
}
