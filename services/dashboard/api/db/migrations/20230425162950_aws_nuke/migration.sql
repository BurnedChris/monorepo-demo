/*
  Warnings:

  - You are about to drop the column `totalDonationAmount` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `totalGiftAidAmount` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingCompleted` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasDonationTemplate` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasInvitedTeamMember` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasLinks` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasOrganisation` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasPaymentDestination` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamCountryCurrencyCode` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamCountryISO` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `teamCountryLanguageTag` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `issuer` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasAvatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasPrivacyPolicy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasTeam` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onboardingHasTermsAndConditions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `publicAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DonationSubscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supporter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupporterAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaxSchemeGBDeclaration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamSupporter` table. If the table is not empty, all the data it contains will be lost.

*/

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_accountId_fkey";
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_donationSubscriptionId_fkey";
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_linkId_fkey";
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_supporterAddressId_fkey";
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_supporterId_fkey";
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_taxSchemeGBDeclarationId_fkey";
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_teamId_fkey";
ALTER TABLE "DonationSubscription" DROP CONSTRAINT "DonationSubscription_accountId_fkey";
ALTER TABLE "DonationSubscription" DROP CONSTRAINT "DonationSubscription_linkId_fkey";
ALTER TABLE "DonationSubscription" DROP CONSTRAINT "DonationSubscription_supporterId_fkey";
ALTER TABLE "DonationSubscription" DROP CONSTRAINT "DonationSubscription_teamId_fkey";
ALTER TABLE "SupporterAddress" DROP CONSTRAINT "SupporterAddress_supporterId_fkey";
ALTER TABLE "TaxSchemeGBDeclaration" DROP CONSTRAINT "TaxSchemeGBDeclaration_supporterAddressId_fkey";
ALTER TABLE "TaxSchemeGBDeclaration" DROP CONSTRAINT "TaxSchemeGBDeclaration_supporterId_fkey";
ALTER TABLE "TaxSchemeGBDeclaration" DROP CONSTRAINT "TaxSchemeGBDeclaration_teamId_fkey";
ALTER TABLE "TeamSupporter" DROP CONSTRAINT "TeamSupporter_addressId_fkey";
ALTER TABLE "TeamSupporter" DROP CONSTRAINT "TeamSupporter_supporterId_fkey";
ALTER TABLE "TeamSupporter" DROP CONSTRAINT "TeamSupporter_taxSchemeGBDeclarationId_fkey";
ALTER TABLE "TeamSupporter" DROP CONSTRAINT "TeamSupporter_teamId_fkey";

-- DropIndex
DROP INDEX "User_issuer_key";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "totalDonationAmount",
DROP COLUMN "totalGiftAidAmount";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "onboardingCompleted",
DROP COLUMN "onboardingHasDonationTemplate",
DROP COLUMN "onboardingHasInvitedTeamMember",
DROP COLUMN "onboardingHasLinks",
DROP COLUMN "onboardingHasOrganisation",
DROP COLUMN "onboardingHasPaymentDestination",
DROP COLUMN "teamCountryCurrencyCode",
DROP COLUMN "teamCountryISO",
DROP COLUMN "teamCountryLanguageTag";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
DROP COLUMN "issuer",
DROP COLUMN "onboardingHasAvatar",
DROP COLUMN "onboardingHasName",
DROP COLUMN "onboardingHasPrivacyPolicy",
DROP COLUMN "onboardingHasTeam",
DROP COLUMN "onboardingHasTermsAndConditions",
DROP COLUMN "publicAddress",
DROP COLUMN "userType";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "s3Url",
DROP COLUMN "data";

-- DropTable
DROP TABLE "Donation";
DROP TABLE "DonationSubscription";
DROP TABLE "Supporter";
DROP TABLE "SupporterAddress";
DROP TABLE "TaxSchemeGBDeclaration";
DROP TABLE "TeamSupporter";

-- DropEnum
DROP TYPE "AnonymousSupporterActivity";
DROP TYPE "AnonymousSupporterColors";
DROP TYPE "DonationStatus";
DROP TYPE "DonationSubscriptionStatus";
DROP TYPE "DonationType";
DROP TYPE "OnboardingStatus";
DROP TYPE "TaxSchemeGBDeclarationStatus";
DROP TYPE "TeamLogRetention";
DROP TYPE "TeamRBACEnum";
DROP TYPE "UserTypeStatus";

-- RenameTables
ALTER TABLE "Link" RENAME TO "GatewayPage";
ALTER TABLE "LinkDomain" RENAME TO "GatewayDomain";
ALTER TABLE "DonationTemplate" RENAME TO "GatewayTemplate";
ALTER TABLE "DonationTemplateGoal" RENAME TO "GatewayTemplateGoal";
ALTER TABLE "_DonationTemplateToDonationTemplateGoal" RENAME TO "_GatewayTemplateToGatewayTemplateGoal";

-- AlterTable
ALTER TABLE "GatewayDomain" RENAME CONSTRAINT "LinkDomain_pkey" TO "GatewayDomain_pkey";
ALTER TABLE "GatewayPage" RENAME CONSTRAINT "Link_pkey" TO "GatewayPage_pkey";
ALTER TABLE "GatewayTemplate" RENAME CONSTRAINT "DonationTemplate_pkey" TO "GatewayTemplate_pkey";
ALTER TABLE "GatewayTemplateGoal" RENAME CONSTRAINT "DonationTemplateGoal_pkey" TO "GatewayTemplateGoal_pkey";

-- RenameForeignKey
ALTER TABLE "GatewayDomain" RENAME CONSTRAINT "LinkDomain_teamId_fkey" TO "GatewayDomain_teamId_fkey";
ALTER TABLE "GatewayPage" RENAME CONSTRAINT "Link_accountId_fkey" TO "GatewayPage_accountId_fkey";
ALTER TABLE "GatewayPage" RENAME CONSTRAINT "Link_domainId_fkey" TO "GatewayPage_domainId_fkey";
ALTER TABLE "GatewayPage" RENAME CONSTRAINT "Link_teamId_fkey" TO "GatewayPage_teamId_fkey";
ALTER TABLE "GatewayPage" RENAME CONSTRAINT "Link_teamOrganisationId_fkey" TO "GatewayPage_teamOrganisationId_fkey";
ALTER TABLE "GatewayPage" RENAME CONSTRAINT "Link_templateId_fkey" TO "GatewayPage_templateId_fkey";
ALTER TABLE "GatewayTemplate" RENAME CONSTRAINT "DonationTemplate_teamId_fkey" TO "GatewayTemplate_teamId_fkey";
ALTER TABLE "GatewayTemplateGoal" RENAME CONSTRAINT "DonationTemplateGoal_teamId_fkey" TO "GatewayTemplateGoal_teamId_fkey";

-- RenameIndex
ALTER INDEX "_DonationTemplateToDonationTemplateGoal_AB_unique" RENAME TO "_GatewayTemplateToGatewayTemplateGoal_AB_unique";
ALTER INDEX "_DonationTemplateToDonationTemplateGoal_B_index" RENAME TO "_GatewayTemplateToGatewayTemplateGoal_B_index";

-- RenameEnumn
ALTER TYPE "LinkDomainType" RENAME TO "GatewayDomainType";
ALTER TYPE "LogoSize" RENAME TO "GatewayTemplateLogoSize";
