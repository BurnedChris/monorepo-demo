const slugReplacer = async (db, oldSlug, NewSlug) => {
  const rows = await db.findMany({})

  // go through each
  for (const row of rows) {
    await db.update({
      where: {
        id: row.id,
      },
      data: {
        id: row.id.replace(oldSlug, NewSlug),
      },
    })
  }

  // return new Promise((resolve) => resolve(results))
}

export default async ({ db }) => {
  // Migration here..
  await slugReplacer(db.link, 'link', 'l')
  await slugReplacer(db.linkDomain, 'domi', 'ld')
  await slugReplacer(db.linkTemplate, 'link', 'lt')
  await slugReplacer(db.linkTemplateGoal, 'goal', 'ltg')
  await slugReplacer(db.donation, 'sing', 'd')
  await slugReplacer(db.donationSubscription, 'sub', 'ds')
  await slugReplacer(db.team, 'team', 't')
  await slugReplacer(db.teamInvitation, 'invt', 'ti')
  await slugReplacer(db.teamMember, 'temr', 'tm')
  await slugReplacer(db.teamMemberLog, 'log', 'tml')
  await slugReplacer(db.teamMemberRole, 'role', 'tmr')
  await slugReplacer(db.teamMemberPermission, 'perm', 'tmp')
  await slugReplacer(db.user, 'usr', 'u')
}
