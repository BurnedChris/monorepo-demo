import { users as clerk } from '@clerk/clerk-sdk-node'
import type { Prisma } from '@prisma/client'
import { clerkContext } from 'src/contexts'
import { db } from 'src/lib/db'
import { DeepPartial, privateMetadata, publicMetadata } from 'types/shared'

type TypedMirrorMetadata = DeepPartial<{
  publicMetadata: publicMetadata
  privateMetadata: privateMetadata
  clerkUserId?: string
}>

export const mirrorMetadata = async ({
  publicMetadata,
  privateMetadata,
  clerkUserId = clerkContext().id,
}: TypedMirrorMetadata) => {
  // we pass in public and private metadata to this function
  // and it will update the in Clerk uisng a `updateUserMetadata` as it will merge
  // this metaData with privious metadata
  const clerkReturns = await clerk.updateUserMetadata(clerkUserId, {
    publicMetadata,
    privateMetadata,
  })

  const data = {
    publicMetadata: clerkReturns.publicMetadata,
    privateMetadata: clerkReturns.privateMetadata,
  } as Prisma.JsonObject

  // Once clerk returns the new metadata that has been merged, we than set it to the
  // everfund DB as a backup
  const user = await db.user.update({
    where: { clerkUserId },
    data,
  })

  return {
    clerk: clerkReturns,
    everfund: user,
  }
}
