// This transform config was generated by Snaplet.
// Snaplet found fields that may contain personally identifiable information (PII)
// and used that to populate this file.
import { copycat, faker } from '@snaplet/copycat'

import type { Transform } from './structure'

const runCopycat = (input, copycat, options?) =>
  input ? copycat(input, options) : input

export const config: Transform = () => ({
  public: {
    // return empty tables
    TeamMemberLog: false,
    TeamInvitation: false,
    File: false,
    User: false,

    //leave tables as they are
    TeamMemberRole: true,
    RW_DataMigration: true,
    TeamMemberPermission: true,

    GatewayTemplate({ row }) {
      return {
        name: runCopycat(row.name, copycat.sentence),
        imageBackground: null,
        imageLogo: null,
        imageOGImage: null,
      }
    },

    GatewayPage({ row }) {
      return {
        // countryISO: copycat.country(row.countryISO),
        textStory: copycat.paragraph(row.textStory, {
          minSentences: 3,
          maxSentences: 7,
        }),
        textThankYou: copycat.paragraph(row.textThankYou, {
          minSentences: 1,
          maxSentences: 3,
        }),
      }
    },

    GatewayDomain({ row }) {
      return {
        domain: row.type === 'FREE' ? row.domain : copycat.email(row.domain),
      }
    },

    Team({ row }) {
      const name = runCopycat(row.name, copycat.word)
      return {
        name: name + 'team',
        shortName: name,
        avatarUrl: null,
        publicMetadata: {
          ...row.publicMetadata,
          timeZone: runCopycat(row.timeZone, copycat.timezone),
        },
      }
    },

    TeamMember({ row }) {
      return {
        jobTitle: runCopycat(row.jobTitle, copycat.fullName),
        phone: runCopycat(row.phone, copycat.phoneNumber),
        teamMemberFirstName: runCopycat(
          row.teamMemberFirstName,
          copycat.firstName
        ),
        teamMemberLastName: runCopycat(
          row.teamMemberLastName,
          copycat.lastName
        ),
      }
    },

    TeamOrganisation({ row }) {
      return {
        companyName: runCopycat(row.name, copycat.word),
        companyTaxId: runCopycat(row.companyTaxId, copycat.int),
        activities: runCopycat(row.activities, copycat.paragraph, {
          minSentences: 1,
          maxSentences: 4,
        }),
        organisationWebsite: runCopycat(row.organisationWebsite, copycat.word),
        organisationPhoneNumber: runCopycat(
          row.organisationPhoneNumber,
          copycat.phoneNumber
        ),
        companyAddressCity: runCopycat(row.companyAddressCity, copycat.city),
        companyAddressCountry: runCopycat(
          row.companyAddressCountry,
          copycat.countryCode
        ),
        companyAddressLine1: runCopycat(
          row.companyAddressLine1,
          copycat.streetAddress
        ),
        companyAddressLine2: null,
        companyAddressPostalCode: runCopycat(
          row.companyAddressPostalCode,
          copycat.word
        ),
        companyAddressState: null,
        companyAddressLat: runCopycat(row.supportAddressLat, copycat.float),
        companyAddressLng: runCopycat(row.supportAddressLng, copycat.float),
        socialFacebook: runCopycat(row.socialFacebook, copycat.word),
        socialInstagram: runCopycat(row.socialInstagram, copycat.word),
        socialTwitter: runCopycat(row.socialTwitter, copycat.word),
        socialLinkedIn: runCopycat(row.socialLinkedIn, copycat.word),
        socialYoutube: runCopycat(row.socialYoutube, copycat.word),
        supportPhoneNumber: runCopycat(
          row.supportPhoneNumber,
          copycat.phoneNumber
        ),
        supportEmail: runCopycat(row.supportEmail, copycat.email),
        supportWebsite: runCopycat(row.supportWebsite, copycat.word),
        supportAddressCity: runCopycat(row.supportAddressCity, copycat.city),
        supportAddressCountry: runCopycat(
          row.supportAddressCountry,
          copycat.countryCode
        ),
        supportAddressLine1: runCopycat(
          row.supportAddressLine1,
          copycat.streetAddress
        ),
        supportAddressLine2: null,
        supportAddressPostalCode: runCopycat(
          row.supportAddressPostalCode,
          copycat.word
        ),
        supportAddressState: null,
        supportAddressLat: runCopycat(row.supportAddressLat, copycat.float),
        supportAddressLng: runCopycat(row.supportAddressLng, copycat.float),
      }
    },

    TeamOrganisationPerson({ row }) {
      return {
        email: runCopycat(row.email, copycat.email),
        firstName: runCopycat(row.firstName, copycat.firstName),
        jobTitle: runCopycat(row.jobTitle, copycat.word),
        lastName: runCopycat(row.lastName, copycat.lastName),
        phoneNumber: runCopycat(row.phoneNumber, copycat.phoneNumber),

        dobDay: runCopycat(row.dobDay, copycat.int, { min: 1, max: 28 }),
        dobMonth: runCopycat(row.dobMonth, copycat.int, { min: 1, max: 12 }),
        dobYear: runCopycat(row.dobYear, copycat.int, { min: 1975, max: 2000 }),

        representative: runCopycat(row.representative, copycat.bool),
        director: runCopycat(row.director, copycat.bool),
        executive: runCopycat(row.executive, copycat.bool),
        owner: runCopycat(row.owner, copycat.bool),

        idDocumentFrontId: runCopycat(row.idDocumentFrontId, copycat.uuid),
        idDocumentBackId: runCopycat(row.idDocumentBackId, copycat.uuid),
        additionalIdDocumentFrontId: runCopycat(
          row.additionalIdDocumentFrontId,
          copycat.uuid
        ),
        additionalIdDocumentBackId: runCopycat(
          row.additionalIdDocumentBackId,
          copycat.uuid
        ),
        addressCity: runCopycat(row.addressCity, copycat.city),
        addressCountry: runCopycat(row.addressCountry, copycat.countryCode),
        addressLine1: runCopycat(row.addressLine1, copycat.streetAddress),
        addressLine2: runCopycat(row.addressLine2, copycat.streetAddress),
        addressPostcode: runCopycat(row.addressCity, copycat.word),
      }
    },
  },
})
