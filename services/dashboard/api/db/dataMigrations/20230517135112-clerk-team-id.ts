import { users as clerk } from '@clerk/clerk-sdk-node'
import type { Prisma } from '@prisma/client'
import type { PrismaClient } from '@prisma/client'

import type { privateMetadata } from '../../../types/shared'

export default async ({ db }: { db: PrismaClient }) => {
  // Migration here...
  // const clerkUsers = await clerk.getUserList({
  //   limit: 9999,
  // })

  const ef_users = await db.user.findMany({})

  for (const everfundUser of ef_users) {
    const clerk_user = await clerk.getUser(everfundUser.clerkUserId)

    const { currentTeamId, currentTeamMemberId } =
      clerk_user.privateMetadata as privateMetadata

    if (!currentTeamId || !currentTeamMemberId || !everfundUser.clerkUserId) {
      continue
    }

    const clerkReturns = await clerk.updateUserMetadata(
      everfundUser.clerkUserId,
      {
        publicMetadata: {
          currentTeam: {
            teamMemberId: currentTeamMemberId,
            id: currentTeamId,
          },
        },
        privateMetadata: {
          currentTeamId: null,
          currentTeamMemberId: null,
        },
      }
    )

    const data = {
      publicMetadata: clerkReturns.publicMetadata,
      privateMetadata: clerkReturns.privateMetadata,
    } as Prisma.JsonObject

    try {
      await db.user.update({
        where: { id: everfundUser.id },
        data,
      })
    } catch (e) {
      console.log(e)
      console.log(`user not in db: ${everfundUser.id}`)
    }
  }
}
