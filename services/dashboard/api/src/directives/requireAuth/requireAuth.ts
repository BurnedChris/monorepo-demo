import {
  AuthenticationError,
  createValidatorDirective,
} from '@redwoodjs/graphql-server'
import gql from 'graphql-tag'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

export const schema = gql`
  """
  Use to check whether or not a user is authenticated and is associated
  with an optional set of roles.
  """
  directive @requireAuth(checkTeam: Boolean) on FIELD_DEFINITION
`

const validate = ({ directiveArgs }) => {
  const { checkTeam = true } = directiveArgs

  Sentry.addBreadcrumb({
    category: 'auth',
    message: 'Authenticating requireAuth directive',
    level: 'info',
    data: {
      checkTeam,
      currentUserType: context?.currentUser?.type,
      currentTeamId: context?.currentUser?.publicMetadata?.currentTeam?.id,
    },
  })

  if (context?.currentUser?.type !== 'clerk') {
    throw new AuthenticationError(
      `You don't have permission to do that because you are not a Clerk user`
    )
  }

  if (checkTeam && !context?.currentUser.publicMetadata?.currentTeam.id) {
    logger.debug(
      context?.currentUser.privateMetadata,
      `user is missing currentTeamId from privateMetadata on clerk`
    )
    throw new AuthenticationError(
      "You don't have a team assigned to your user account."
    )
  }

  // disabled permissions for now
  // if (
  //   typeof permissions !== 'undefined' &&
  //   typeof permissions === 'string' &&
  //   !context.currentUser.roles?.includes(permissions)
  // ) {
  //   throw new ForbiddenError("You don't have access to do that.")
  // }

  // if (
  //   typeof permissions !== 'undefined' &&
  //   Array.isArray(permissions) &&
  //   !context.currentUser.roles?.some((r) => permissions.includes(r))
  // ) {
  //   throw new ForbiddenError("You don't have access to do that.")
  // }
}

export default createValidatorDirective(schema, validate)
