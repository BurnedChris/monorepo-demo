// import { useSentry } from '@envelop/sentry'
// import { useHive } from '@graphql-hive/client'
import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import { addRequestContext } from 'src/contexts/addRequestContext'
import directives from 'src/directives/**/*.{js,ts}'
import { env } from 'src/env'
import schemas from 'src/graphql/**/*.sdl.{js,ts}'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import 'src/lib/sentry'
import { verifyTokenType } from 'src/middlewares/verify/verifyTokenType'
import services from 'src/services/**/*.{js,ts}'

// const extraPlugins = [
//   useSentry({
//     includeRawResult: true,
//     includeResolverArgs: true,
//     includeExecuteVariables: true,
//   }),
//   env.GRAPHQL_HIVE_API_KEY &&
//     useHive({
//       token: env.GRAPHQL_HIVE_API_KEY, // Hive API Key
//       // Schema reporting
//       usage: true, // Collects schema usage based on operations
//     }),
// ]

export const handler = createGraphQLHandler({
  authDecoder: verifyTokenType,
  healthCheckId: 'everfund-dashboard',
  loggerConfig: {
    logger,
    options: {
      tracing: true,
      operationName: true,
      requestId: true,
      query: true,
    },
  },
  getCurrentUser: async (decoded) => decoded,
  directives,
  sdls: schemas,
  services,
  context: ({ context }) => addRequestContext(context.event.headers),
  defaultError:
    env.PUBLIC_APPLICATION_ENVIRONMENT === 'production' &&
    'Sorry about that, if problems persist please contact dev-support@everfund.com',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  cors: (request: { headers: { get: (origin: string) => any } }) => {
    const requestOrigin = request.headers.get('origin')
    console.log('requestOrigin', requestOrigin)
    return {
      origin: requestOrigin,
      credentials: true,
    }
  },
  armorConfig: { maxDepth: { n: 6 } },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
  // extraPlugins,
})
