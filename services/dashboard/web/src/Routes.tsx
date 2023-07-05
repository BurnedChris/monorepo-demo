// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'   -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import { Private, Route, Router, Set } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'

import { useAuth } from './auth'
import {
  GatewayPagesLayout,
  GatewayPagesProvider,
} from './layouts/LinksLayout/LinksLayout'
import OnboardingLayout from './layouts/OnboardingLayout'
import SidebarLayout from './layouts/SidebarLayout/SidebarLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth} trailingSlashes="never">
      <Route path="/health" page={() => <>200 - OK</>} name="health" />
      <Route path="/sign-up" page={AuthSignUpPage} name="signUp" />
      <Route path="/sign-in" page={AuthSignInPage} name="signIn" />
      <Route
        path="/authentication/oauth"
        page={AuthCallbacksOAuthPage}
        name="authOAuth"
      />
      <Route
        path="/authentication/magic-link"
        page={AuthCallbacksMagicLinkPage}
        name="authMagicLink"
      />
      <Route
        path="/authentication/redirect"
        page={AuthRedirectPage}
        name="authRedirect"
      />
      <Private unauthenticated="authRedirect">
        <Set wrap={[(props) => <OnboardingLayout {...props} />]}>
          <Route
            path="/onboarding"
            page={AuthGuidedOnboardingPage}
            name="onboarding"
          />
          <Route path="/pick-team" page={AuthPickTeamPage} name="pickTeam" />
          <Route
            path="/pick-team/create"
            page={AuthPickTeamPage}
            name="createTeam"
          />
        </Set>
        <Set wrap={[(props) => <MainLayout {...props} />]}>
          <Route path="/" page={HomePage} name="home" />

          <Set
            wrap={[(props) => <SidebarLayout {...props} navType="settings" />]}
          >
            <Route
              path="/settings/payment-destinations"
              page={SettingsPaymentsTeamPaymentDestinationsPage}
              name="teamPaymentDestinations"
            />
            <Route
              path="/settings/payment-destinations/new"
              page={SettingsPaymentsNewTeamPaymentDestinationPage}
              name="newTeamPaymentDestination"
            />

            <Route
              path="/settings/payment-destinations/{id}"
              page={SettingsPaymentsTeamPaymentDestinationPage}
              name="teamPaymentDestination"
            />

            <Route
              path="/settings/organisation/people/new"
              page={SettingsOrganisationNewTeamOrganisationPersonPage}
              name="newTeamOrganisationPerson"
            />
            <Route
              path="/settings/organisation/people/{id}"
              page={SettingsOrganisationTeamOrganisationPersonPage}
              name="teamOrganisationPerson"
            />
            <Route
              path="/settings/organisation/new"
              page={SettingsOrganisationNewTeamOrganisationPage}
              name="newTeamOrganisation"
            />
            <Route
              path="/settings/organisation"
              page={SettingsOrganisationTeamOrganisationPage}
              name="teamOrganisation"
            />
            <Route
              path="/settings/logs"
              page={SettingsLogsTeamMemberLogsPage}
              name="teamMemberLogs"
            />
            <Route
              path="/settings/logs/{id}"
              page={SettingsLogsTeamMemberLogPage}
              name="teamMemberLog"
            />
            <Route
              path="/settings/team-members"
              page={SettingsTeamMembersTeamMembersPage}
              name="teamMembers"
            />
            <Route
              path="/settings/team-members/invite"
              page={SettingsTeamMembersInviteTeamMemberPage}
              name="teamMemberInvite"
            />
            <Route
              path="/settings/team-members/{id}"
              page={SettingsTeamMembersTeamMemberPage}
              name="teamMember"
            />
            <Route
              path="/settings/team-roles"
              page={SettingsRolesTeamMemberRolesPage}
              name="teamRoles"
            />
            <Route
              path="/settings/team-roles/{id}"
              page={SettingsRolesTeamMemberRolePage}
              name="teamMemberRolePage"
            />
            <Route
              path="/settings/team-roles/{id}/edit"
              page={SettingsRolesEditTeamMemberRolePage}
              name="editTeamMemberRole"
            />
            <Route
              path="/settings/team-roles/new"
              page={SettingsRolesNewTeamMemberRolePage}
              name="newTeamMemberRole"
            />
          </Set>

          <Set
            wrap={[(props) => <SidebarLayout {...props} navType="donations" />]}
          >
            <Route
              path="/donations"
              page={DonationsDonationsPage}
              name="donations"
            />
            <Route
              path="/donations/{id}"
              page={DonationsDonationPage}
              name="donation"
            />
          </Set>

          <Set
            wrap={[
              (props) => <SidebarLayout {...props} navType="integrations" />,
            ]}
          >
            <Route
              path="/integrations/templates/goals/new"
              page={GatewayGoalsNewGoalPage}
              name="newGatewayTemplateGoal"
            />
            <Route
              path="/integrations/templates/goals/{id}"
              page={GatewayGoalsGoalPage}
              name="gatewayTemplateGoal"
            />
            <Route
              path="/integrations/templates/goals"
              page={GatewayGoalsGoalsPage}
              name="gatewayTemplateGoals"
            />

            <Route
              path="/integrations/templates/new"
              page={GatewayTemplatesNewTemplatePage}
              name="newGatewayTemplate"
            />

            <Route
              path="/integrations/templates"
              page={GatewayTemplatesTemplatesPage}
              name="gatewayTemplates"
            />
            <Route
              path="/integrations/templates/{id}"
              page={GatewayTemplatesTemplatePage}
              name="gatewayTemplate"
            />

            <Set
              wrap={[
                (props) => <GatewayPagesProvider type="link" {...props} />,
              ]}
            >
              <Route
                path="/integrations/links/new"
                page={GatewaySharedNewGatewayPage}
                name="gatewayNewLink"
              />

              <Route
                path="/integrations/links"
                page={GatewaySharedGatewayPagesPage}
                name="gatewayPageLinks"
              />

              <Set wrap={[(props) => <GatewayPagesLayout {...props} />]}>
                <Route
                  path="/integrations/links/{id}/qrcode"
                  page={GatewayLinksQRCodePage}
                  name="gatewayPageLinkQRCode"
                />
                <Route
                  path="/integrations/links/{id}/settings"
                  page={GatewaySharedGatewaySettingsPage}
                  name="gatewayPageLinkSettings"
                />
                <Route
                  path="/integrations/links/{id}/share"
                  page={GatewayLinksSharePage}
                  name="gatewayPageLinkShare"
                />
                <Route
                  path="/integrations/links/{id}"
                  page={GatewaySharedGatewayPage}
                  name="gatewayPageLink"
                />
              </Set>
            </Set>
            <Set
              wrap={[
                (props) => <GatewayPagesProvider type="widget" {...props} />,
              ]}
            >
              <Route
                path="/integrations/widgets/new"
                page={GatewaySharedNewGatewayPage}
                name="gatewayNewWidget"
              />

              <Route
                path="/integrations/widgets"
                page={GatewaySharedGatewayPagesPage}
                name="gatewayPageWidgets"
              />

              <Set wrap={[(props) => <GatewayPagesLayout {...props} />]}>
                <Route
                  path="/integrations/widgets/{id}/settings"
                  page={GatewaySharedGatewaySettingsPage}
                  name="gatewayPageWidgetsettings"
                />

                <Route
                  path="/integrations/widgets/{id}/code-snippet"
                  page={GatewayWidgetCodeSnippetPage}
                  name="donationWidgetCodeSnippet"
                />

                <Route
                  path="/integrations/widgets/{id}"
                  page={GatewaySharedGatewayPage}
                  name="gatewayPageWidget"
                />
              </Set>
            </Set>
          </Set>
          <Set
            wrap={[
              (props) => <SidebarLayout {...props} navType="supporters" />,
            ]}
          >
            <Route
              path="/supporters"
              page={SupportersSupportersPage}
              name="supporters"
            />
            <Route
              path="/supporters/{id}"
              page={SupportersSupporterPage}
              name="supporter"
            />
            <Route
              path="/subscriptions"
              page={SubscriptionsSubscriptionsPage}
              name="subscriptions"
            />
            <Route
              path="/subscriptions/{id}"
              page={SubscriptionsSubscriptionPage}
              name="subscription"
            />
          </Set>
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
