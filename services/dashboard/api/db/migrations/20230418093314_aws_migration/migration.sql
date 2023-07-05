-- CreateEnum
CREATE TYPE "DonationType" AS ENUM ('SINGLE', 'MONTHLY');

-- CreateEnum
CREATE TYPE "DonationStatus" AS ENUM ('canceled', 'failed', 'pending', 'processing', 'requires_action', 'requires_capture', 'requires_confirmation', 'requires_payment_method', 'succeeded');

-- CreateEnum
CREATE TYPE "TaxSchemeGBDeclarationStatus" AS ENUM ('CLAIMED', 'UNCLAIMED', 'EXPORTED');

-- CreateEnum
CREATE TYPE "DonationSubscriptionStatus" AS ENUM ('active', 'incomplete');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('link', 'widget');

-- CreateEnum
CREATE TYPE "LinkDomainType" AS ENUM ('FREE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "LogoSize" AS ENUM ('default', 'sm', 'md', 'lg');

-- CreateEnum
CREATE TYPE "AnonymousSupporterColors" AS ENUM ('blue', 'brown', 'green', 'maroon', 'pink', 'purple', 'red', 'yellow');

-- CreateEnum
CREATE TYPE "AnonymousSupporterActivity" AS ENUM ('jogger', 'skier', 'walker', 'biker', 'skater', 'bowler', 'curler', 'snowboarder', 'runner', 'dancer', 'cook', 'baker', 'boxer', 'hiker', 'shopper', 'programmer', 'builder');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('SENT', 'REVOKED', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "TeamMemberLogActionTypes" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'DOWNLOAD');

-- CreateEnum
CREATE TYPE "UserTypeStatus" AS ENUM ('nonprofit', 'developer');

-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('completed', 'notStarted', 'skipped');

-- CreateEnum
CREATE TYPE "OnboardingTeamStatus" AS ENUM ('closed', 'completed', 'notStarted', 'skipped');

-- CreateEnum
CREATE TYPE "TeamLogRetention" AS ENUM ('threeDays', 'oneWeek', 'oneMonth', 'infinite');

-- CreateEnum
CREATE TYPE "TeamRBACEnum" AS ENUM ('basic', 'advanced', 'customisable');

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "baseAmount" INTEGER NOT NULL,
    "countryCurrencyCode" TEXT NOT NULL DEFAULT 'GBP',
    "countryLanguageTag" TEXT NOT NULL DEFAULT 'en-GB',
    "liveMode" BOOLEAN NOT NULL DEFAULT true,
    "type" "DonationType" NOT NULL DEFAULT 'SINGLE',
    "status" "DonationStatus" NOT NULL,
    "stripePaymentIntentId" TEXT,
    "taxSchemeGBDeclarationStatus" "TaxSchemeGBDeclarationStatus",
    "isCoveringFee" BOOLEAN NOT NULL DEFAULT true,
    "isDomesticCard" BOOLEAN NOT NULL DEFAULT true,
    "isSameCurrency" BOOLEAN NOT NULL DEFAULT true,
    "coverEverfundFeeAmount" INTEGER NOT NULL,
    "coverFeeAmount" INTEGER NOT NULL,
    "coverNonProfitReceives" INTEGER NOT NULL,
    "coverNonProfitReceivesTaxSchemeGB" INTEGER NOT NULL,
    "coverStripeFeeAmount" INTEGER NOT NULL,
    "notCoverEverfundFeeAmount" INTEGER NOT NULL,
    "notCoverFeeAmount" INTEGER NOT NULL,
    "notCoverNonProfitReceives" INTEGER NOT NULL,
    "notCoverNonProfitReceivesTaxSchemeGB" INTEGER NOT NULL,
    "notCoverStripeFeeAmount" INTEGER NOT NULL,
    "marketingEmail" BOOLEAN NOT NULL DEFAULT false,
    "marketingPhone" BOOLEAN NOT NULL DEFAULT false,
    "marketingPost" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "donationSubscriptionId" TEXT,
    "linkId" TEXT NOT NULL,
    "supporterId" TEXT,
    "supporterAddressId" TEXT,
    "taxSchemeGBDeclarationId" TEXT,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationSubscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "liveMode" BOOLEAN NOT NULL DEFAULT true,
    "status" "DonationSubscriptionStatus" NOT NULL DEFAULT 'active',
    "stripeSubscriptionId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "supporterId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "DonationSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "fileName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB,
    "s3Url" TEXT,
    "teamId" TEXT NOT NULL,
    "teamMemberId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxSchemeGBDeclaration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "supporterId" TEXT,
    "teamId" TEXT,
    "supporterAddressId" TEXT,

    CONSTRAINT "TaxSchemeGBDeclaration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "canCollectGiftAid" BOOLEAN NOT NULL DEFAULT true,
    "canCollectMarketingInformation" BOOLEAN NOT NULL DEFAULT true,
    "countryCurrencyCode" TEXT NOT NULL DEFAULT 'GBP',
    "countryISO" TEXT NOT NULL DEFAULT 'GB',
    "countryLanguageTag" TEXT NOT NULL DEFAULT 'en-GB',
    "liveMode" BOOLEAN NOT NULL DEFAULT true,
    "productType" "ProductType" NOT NULL DEFAULT 'link',
    "textStory" TEXT NOT NULL,
    "textThankYou" TEXT NOT NULL,
    "totalDonationAmount" INTEGER NOT NULL DEFAULT 0,
    "totalGiftAidAmount" INTEGER NOT NULL DEFAULT 0,
    "accountId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "templateId" TEXT,
    "teamOrganisationId" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkDomain" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL DEFAULT 'evr.fund',
    "type" "LinkDomainType" NOT NULL DEFAULT 'CUSTOM',
    "teamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LinkDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationTemplate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "colorAccent" TEXT NOT NULL DEFAULT '#E65F66',
    "colorBackground" TEXT NOT NULL DEFAULT '#252F3F',
    "showDonationGoals" BOOLEAN NOT NULL DEFAULT false,
    "showEverfundBranding" BOOLEAN NOT NULL DEFAULT true,
    "imageBackground" TEXT,
    "imageBackgroundColor" TEXT,
    "imageLogo" TEXT,
    "imageLogoSize" "LogoSize",
    "imageOGImage" TEXT,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "DonationTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationTemplateGoal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "DonationTemplateGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supporter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "anonymousActivity" "AnonymousSupporterActivity",
    "anonymousColors" "AnonymousSupporterColors",
    "anonymousCode" TEXT,

    CONSTRAINT "Supporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupporterAddress" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "postalCode" TEXT NOT NULL,
    "state" TEXT,
    "supporterId" TEXT,

    CONSTRAINT "SupporterAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamSupporter" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "anonymousActivity" "AnonymousSupporterActivity",
    "anonymousColors" "AnonymousSupporterColors",
    "anonymousCode" TEXT,
    "addressId" TEXT,
    "taxSchemeGBDeclarationId" TEXT,
    "teamId" TEXT NOT NULL,
    "supporterId" TEXT NOT NULL,

    CONSTRAINT "TeamSupporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatarUrl" TEXT,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "teamCountryCurrencyCode" TEXT NOT NULL DEFAULT 'GBP',
    "teamCountryISO" TEXT NOT NULL DEFAULT 'GB',
    "teamCountryLanguageTag" TEXT NOT NULL DEFAULT 'en-GB',
    "publicMetadata" JSONB,
    "privateMetadata" JSONB,
    "teamOrganisationId" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "onboardingHasInvitedTeamMember" "OnboardingTeamStatus" DEFAULT 'notStarted',
    "onboardingHasLinks" "OnboardingTeamStatus" DEFAULT 'notStarted',
    "onboardingHasDonationTemplate" "OnboardingTeamStatus" DEFAULT 'notStarted',
    "onboardingHasPaymentDestination" "OnboardingTeamStatus" DEFAULT 'notStarted',
    "onboardingHasOrganisation" "OnboardingTeamStatus" DEFAULT 'notStarted',

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamInvitation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'SENT',
    "invitedById" TEXT,
    "roleId" TEXT,
    "teamId" TEXT,

    CONSTRAINT "TeamInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamOrganisation" (
    "id" TEXT NOT NULL,
    "companyName" TEXT,
    "companyTaxId" TEXT,
    "activities" TEXT,
    "organisationWebsite" TEXT,
    "organisationPhoneNumber" TEXT,
    "completedMainForm" "OnboardingTeamStatus" DEFAULT 'notStarted',
    "completedSignificantControl" "OnboardingTeamStatus" DEFAULT 'notStarted',
    "completedSupport" "OnboardingTeamStatus" DEFAULT 'notStarted',
    "companyAddressCity" TEXT,
    "companyAddressCountry" TEXT,
    "companyAddressLine1" TEXT,
    "companyAddressLine2" TEXT,
    "companyAddressPostalCode" TEXT,
    "companyAddressState" TEXT,
    "companyAddressLat" DOUBLE PRECISION,
    "companyAddressLng" DOUBLE PRECISION,
    "socialFacebook" TEXT,
    "socialInstagram" TEXT,
    "socialTwitter" TEXT,
    "socialLinkedIn" TEXT,
    "socialYoutube" TEXT,
    "supportPhoneNumber" TEXT,
    "supportEmail" TEXT,
    "supportWebsite" TEXT,
    "supportAddressCity" TEXT,
    "supportAddressCountry" TEXT,
    "supportAddressLine1" TEXT,
    "supportAddressLine2" TEXT,
    "supportAddressPostalCode" TEXT,
    "supportAddressState" TEXT,
    "supportAddressLat" DOUBLE PRECISION,
    "supportAddressLng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamOrganisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamOrganisationPerson" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "dobDay" INTEGER,
    "dobMonth" INTEGER,
    "dobYear" INTEGER,
    "jobTitle" TEXT,
    "representative" BOOLEAN NOT NULL,
    "director" BOOLEAN NOT NULL,
    "executive" BOOLEAN NOT NULL,
    "owner" BOOLEAN NOT NULL,
    "idDocumentFrontId" TEXT,
    "idDocumentBackId" TEXT,
    "additionalIdDocumentFrontId" TEXT,
    "additionalIdDocumentBackId" TEXT,
    "addressCity" TEXT,
    "addressCountry" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "addressPostcode" TEXT,
    "teamOrganisationId" TEXT,
    "teamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamOrganisationPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamPaymentDestination" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountName" TEXT NOT NULL,
    "legacyAccount" BOOLEAN NOT NULL DEFAULT false,
    "applicationFee" INTEGER NOT NULL DEFAULT 3,
    "liveMode" BOOLEAN NOT NULL DEFAULT true,
    "teamId" TEXT,

    CONSTRAINT "TeamPaymentDestination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobTitle" TEXT,
    "phone" TEXT,
    "preferTeamMemberName" BOOLEAN NOT NULL DEFAULT false,
    "teamMemberFirstName" TEXT,
    "teamMemberLastName" TEXT,
    "donationViewSingleLastViewed" TIMESTAMP(3),
    "donationViewRecurringLastViewed" TIMESTAMP(3),
    "donationViewGiftAidLastViewed" TIMESTAMP(3),
    "donationViewMarketingLastViewed" TIMESTAMP(3),
    "teamId" TEXT,
    "teamMemberRoleId" TEXT,
    "userId" TEXT,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMemberLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT,
    "actionType" "TeamMemberLogActionTypes" NOT NULL,
    "description" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "extraData" JSONB,
    "ipAddress" TEXT,
    "teamId" TEXT NOT NULL,
    "teamMemberId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TeamMemberLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMemberPermission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TeamMemberPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMemberRole" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "uneditable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TeamMemberRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "clerkUserId" TEXT,
    "publicMetadata" JSONB,
    "privateMetadata" JSONB,
    "avatarUrl" TEXT,
    "onboardingHasAvatar" "OnboardingStatus" DEFAULT 'notStarted',
    "onboardingHasName" "OnboardingStatus" DEFAULT 'notStarted',
    "onboardingHasPrivacyPolicy" "OnboardingStatus" DEFAULT 'notStarted',
    "onboardingHasTeam" "OnboardingStatus" DEFAULT 'notStarted',
    "onboardingHasTermsAndConditions" "OnboardingStatus" DEFAULT 'notStarted',
    "issuer" TEXT,
    "publicAddress" TEXT,
    "userType" "UserTypeStatus",
    "currentRoleId" TEXT,
    "currentTeamId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RW_DataMigration" (
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RW_DataMigration_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "_DonationTemplateToDonationTemplateGoal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TeamToTeamMemberRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TeamMemberPermissionToTeamMemberRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_stripePaymentIntentId_key" ON "Donation"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "DonationSubscription_stripeSubscriptionId_key" ON "DonationSubscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxSchemeGBDeclaration_supporterAddressId_key" ON "TaxSchemeGBDeclaration"("supporterAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "Supporter_email_key" ON "Supporter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supporter_anonymousCode_key" ON "Supporter"("anonymousCode");

-- CreateIndex
CREATE UNIQUE INDEX "TeamSupporter_addressId_key" ON "TeamSupporter"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamSupporter_taxSchemeGBDeclarationId_key" ON "TeamSupporter"("taxSchemeGBDeclarationId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamSupporter_teamId_supporterId_key" ON "TeamSupporter"("teamId", "supporterId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMemberPermission_name_key" ON "TeamMemberPermission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_issuer_key" ON "User"("issuer");

-- CreateIndex
CREATE UNIQUE INDEX "_DonationTemplateToDonationTemplateGoal_AB_unique" ON "_DonationTemplateToDonationTemplateGoal"("A", "B");

-- CreateIndex
CREATE INDEX "_DonationTemplateToDonationTemplateGoal_B_index" ON "_DonationTemplateToDonationTemplateGoal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToTeamMemberRole_AB_unique" ON "_TeamToTeamMemberRole"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToTeamMemberRole_B_index" ON "_TeamToTeamMemberRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamMemberPermissionToTeamMemberRole_AB_unique" ON "_TeamMemberPermissionToTeamMemberRole"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamMemberPermissionToTeamMemberRole_B_index" ON "_TeamMemberPermissionToTeamMemberRole"("B");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "TeamPaymentDestination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donationSubscriptionId_fkey" FOREIGN KEY ("donationSubscriptionId") REFERENCES "DonationSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_supporterAddressId_fkey" FOREIGN KEY ("supporterAddressId") REFERENCES "SupporterAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_taxSchemeGBDeclarationId_fkey" FOREIGN KEY ("taxSchemeGBDeclarationId") REFERENCES "TaxSchemeGBDeclaration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationSubscription" ADD CONSTRAINT "DonationSubscription_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "TeamPaymentDestination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationSubscription" ADD CONSTRAINT "DonationSubscription_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationSubscription" ADD CONSTRAINT "DonationSubscription_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationSubscription" ADD CONSTRAINT "DonationSubscription_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxSchemeGBDeclaration" ADD CONSTRAINT "TaxSchemeGBDeclaration_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxSchemeGBDeclaration" ADD CONSTRAINT "TaxSchemeGBDeclaration_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxSchemeGBDeclaration" ADD CONSTRAINT "TaxSchemeGBDeclaration_supporterAddressId_fkey" FOREIGN KEY ("supporterAddressId") REFERENCES "SupporterAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "TeamPaymentDestination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "LinkDomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "DonationTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_teamOrganisationId_fkey" FOREIGN KEY ("teamOrganisationId") REFERENCES "TeamOrganisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkDomain" ADD CONSTRAINT "LinkDomain_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTemplate" ADD CONSTRAINT "DonationTemplate_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTemplateGoal" ADD CONSTRAINT "DonationTemplateGoal_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupporterAddress" ADD CONSTRAINT "SupporterAddress_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamSupporter" ADD CONSTRAINT "TeamSupporter_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "SupporterAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamSupporter" ADD CONSTRAINT "TeamSupporter_taxSchemeGBDeclarationId_fkey" FOREIGN KEY ("taxSchemeGBDeclarationId") REFERENCES "TaxSchemeGBDeclaration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamSupporter" ADD CONSTRAINT "TeamSupporter_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamSupporter" ADD CONSTRAINT "TeamSupporter_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES "Supporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamOrganisationId_fkey" FOREIGN KEY ("teamOrganisationId") REFERENCES "TeamOrganisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "TeamMemberRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInvitation" ADD CONSTRAINT "TeamInvitation_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamOrganisationPerson" ADD CONSTRAINT "TeamOrganisationPerson_teamOrganisationId_fkey" FOREIGN KEY ("teamOrganisationId") REFERENCES "TeamOrganisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamOrganisationPerson" ADD CONSTRAINT "TeamOrganisationPerson_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamPaymentDestination" ADD CONSTRAINT "TeamPaymentDestination_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamMemberRoleId_fkey" FOREIGN KEY ("teamMemberRoleId") REFERENCES "TeamMemberRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMemberLog" ADD CONSTRAINT "TeamMemberLog_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMemberLog" ADD CONSTRAINT "TeamMemberLog_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMemberLog" ADD CONSTRAINT "TeamMemberLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentRoleId_fkey" FOREIGN KEY ("currentRoleId") REFERENCES "TeamMemberRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentTeamId_fkey" FOREIGN KEY ("currentTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonationTemplateToDonationTemplateGoal" ADD CONSTRAINT "_DonationTemplateToDonationTemplateGoal_A_fkey" FOREIGN KEY ("A") REFERENCES "DonationTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonationTemplateToDonationTemplateGoal" ADD CONSTRAINT "_DonationTemplateToDonationTemplateGoal_B_fkey" FOREIGN KEY ("B") REFERENCES "DonationTemplateGoal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTeamMemberRole" ADD CONSTRAINT "_TeamToTeamMemberRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToTeamMemberRole" ADD CONSTRAINT "_TeamToTeamMemberRole_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMemberRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMemberPermissionToTeamMemberRole" ADD CONSTRAINT "_TeamMemberPermissionToTeamMemberRole_A_fkey" FOREIGN KEY ("A") REFERENCES "TeamMemberPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamMemberPermissionToTeamMemberRole" ADD CONSTRAINT "_TeamMemberPermissionToTeamMemberRole_B_fkey" FOREIGN KEY ("B") REFERENCES "TeamMemberRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
