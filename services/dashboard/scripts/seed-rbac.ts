import { db } from 'api/src/lib/db'

export default async () => {
  if (process.env.PUBLIC_APPLICATION_ENVIRONMENT === 'production') {
    return console.log('Skipping RBAC seed in production')
  }

  try {
    const permissions = [
      // old pems
      { id: 'pem_lXc6YuLOoSgICgkgHEt47k8v', name: 'balance:read' },
      { id: 'pem_9S2ncNbk7jVpgY7ednqDD9PO', name: 'roles:write' },
      { id: 'pem_Aq97t0nrWiJx9evuFm9sXZqS', name: 'billing:read' },
      { id: 'pem_BeaKZbK0BRre16qglhFZpsrz', name: 'teamMembers:update' },
      { id: 'pem_bhNNxgdbC4u68G1d9f0bjUwR', name: 'singleDonations:read' },
      { id: 'pem_eKuI2tOn3mUgGkeb7BpwzAu0', name: 'invitations:read' },
      { id: 'pem_Iifg7nXDnUXXkBaKR3oRlGsA', name: 'paymentAccounts:read' },
      { id: 'pem_JWu0aRhimzQkVJWdxJnbsEdV', name: 'teamMembers:delete' },
      { id: 'pem_kHjDGukVDTqziuHZJ85OCijC', name: 'invitations:write' },
      { id: 'pem_lGipZbf2k5eADSZpFcfPeThm', name: 'roles:delete' },
      { id: 'pem_OQU8QhYEBYJ4OqB5MXo08YpX', name: 'teamMembers:read' },
      { id: 'pem_QDyx7oCnif7lFKQrUiHChlnR', name: 'monthlyDonations:read' },
      { id: 'pem_qzC0S147eCWs1Z7H5MkqjCeu', name: 'paymentAccounts:create' },
      { id: 'pem_rkCM39BEHNtLB5D6PjZW1EHp', name: 'paymentAccounts:update' },
      { id: 'pem_sO827AmuOoSMM68ni8iWnmtK', name: 'roles:read' },
      { id: 'pem_ueQjLNd8HuF0HPU16hz6uePp', name: 'logs:read' },
      { id: 'pem_VXMFmK0kTcPjOSjcORSlLFG6', name: 'invitations:delete' },
      // new pems
    ]

    const roles = [
      // old pems
      {
        id: 'tmr_tf3YoBOhuMQcRYG97Hpyhljx',
        name: 'Contributor',
        uneditable: true,
      },
      {
        id: 'tmr_YMuAxYd2LN684oXuzcjrf5iy',
        name: 'Owner',
        uneditable: true,
      },
      {
        id: 'tmr_Zwx3g7a3Wb8h6LqLYEkdEcrW',
        name: 'Admin',
        uneditable: true,
      },

      // new pems
    ]
    for (const perm of permissions) {
      const { id, name } = perm
      await db.teamMemberPermission.upsert({
        where: {
          name,
        },
        create: {
          id,
          name,
        },
        update: {
          id,
          name,
        },
      })
    }

    for (const role of roles) {
      const { id, name, uneditable } = role
      await db.teamMemberRole.upsert({
        where: {
          id,
        },
        create: {
          id,
          name,
          uneditable,
          permissions: {
            connect: permissions.map(({ id }) => ({ id })),
          },
        },
        update: {
          name,
          uneditable,
          permissions: {
            connect: permissions.map(({ id }) => ({ id })),
          },
        },
      })
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
