import { db } from 'api/src/lib/db'
import { stripeClient } from 'api/src/utils/clients'
import idNumberAlphabet from 'api/src/utils/customAlphabet'

export default async () => {
  const teamPaymentAccounts = await db.teamPaymentAccount.findMany()

  for (const element of teamPaymentAccounts) {
    if (!element.legacyAccount) {
      const getStripeData = await stripeClient(true).accounts.retrieve(
        element.id
      )

      const teamOrg = await db.teamOrganisation.create({
        data: {
          id: `to_${await idNumberAlphabet()}`,
          companiesHouseName: getStripeData?.business_profile?.name,
          activities: element?.description,
          companiesHouseNumber: element?.companyIdNumber,
          charitiesRegisterNumber: element?.charityIdNumber,
          organisationWebsite: getStripeData?.business_profile.support_url,
          organisationPhoneNumber: element?.supportWebsite,
          supportPhoneNumber: getStripeData?.business_profile.support_phone,
          supportEmail: getStripeData?.business_profile.support_email,
          supportAddressLine1:
            getStripeData?.business_profile?.support_address?.line1,
          supportAddressLine2:
            getStripeData?.business_profile?.support_address?.line2,
          supportAddressCity:
            getStripeData?.business_profile?.support_address?.city,
          supportAddressPostalCode:
            getStripeData?.business_profile?.support_address?.postal_code,
          supportAddressState:
            getStripeData?.business_profile?.support_address?.state,
          supportAddressCountry:
            getStripeData?.business_profile?.support_address?.country,
          companyAddressLine1:
            getStripeData?.business_profile?.support_address?.line1,
          companyAddressLine2:
            getStripeData?.business_profile?.support_address?.line2,
          companyAddressCity:
            getStripeData?.business_profile?.support_address?.city,
          companyAddressPostalCode:
            getStripeData?.business_profile?.support_address?.postal_code,
          companyAddressState:
            getStripeData?.business_profile?.support_address?.state,
          companyAddressCountry:
            getStripeData?.business_profile?.support_address?.country,
          companyAddressLat: element.supportAddressLat,
          companyAddressLng: element.supportAddressLng,
          supportAddressLat: element.supportAddressLat,
          supportAddressLng: element.supportAddressLng,
          team: {
            connect: {
              id: element.teamId,
            },
          },
        },
      })

      const getUsers = await stripeClient(true).accounts.listPersons(element.id)

      for (const person of getUsers.data) {
        await db.teamOrganisationPerson.create({
          data: {
            id: `top_${await idNumberAlphabet()}`,
            firstName: person.first_name,
            lastName: person.last_name,
            phoneNumber: person.phone,
            email: person.email,
            jobTitle: person.relationship.title,
            representative: person.relationship.representative,
            director: person.relationship.director,
            executive: person.relationship.executive,
            owner: person.relationship.owner,
            teamOrganisationId: teamOrg.id,
            teamId: element.teamId,
            addressCity: person?.address?.city,
            addressCountry: person?.address?.country,
            addressLine1: person?.address?.line1,
            addressLine2: person?.address?.line2,
            addressPostcode: person?.address?.postal_code,
            dobDay: person?.dob?.day,
            dobMonth: person?.dob?.month,
            dobYear: person?.dob?.year,
            idDocumentFrontId: person?.verification?.document?.front,
            idDocumentBackId: person?.verification?.document?.back,
            additionalIdDocumentFrontId:
              person?.verification?.additional_document?.front,
            additionalIdDocumentBackId:
              person?.verification?.additional_document?.back,
          },
        })
      }

      const donationLink = await db.link.findMany({
        where: {
          teamId: element.id,
        },
      })

      for (const link of donationLink) {
        await db.link.update({
          where: {
            id: link.id,
          },
          data: {
            teamOrganisationId: teamOrg.id,
          },
        })
      }
    }
  }
  // let i
  // for (i = 0; i < 100; i++) {
  //   console.log(`top_${await idNumberAlphabet()}`)
  // }
}
