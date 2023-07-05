import { getConfig } from '@redwoodjs/project-config'
import redwood from '@redwoodjs/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import dns from 'dns'
import { defineConfig, loadEnv } from 'vite'

// See: https://vitejs.dev/config/server-options.html#server-host
// So that Vite will load on local instead of 127.0.0.1
dns.setDefaultResultOrder('verbatim')

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  const redwoodConfig = getConfig()
  const redwoodEnvs = Object.fromEntries(
    redwoodConfig.web.includeEnvironmentVariables.map((envName) => [
      envName,
      env[envName],
    ])
  )

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    resolve: {
      alias: {
        graphql: 'graphql-web-lite',
      },
    },
    define: {
      'process.env': redwoodEnvs,
    },
    plugins: [
      redwood(),
      // Put the Sentry vite plugin after all other plugins
      env.PROD &&
        sentryVitePlugin({
          org: 'everfundcom',
          project: 'dashboard',
          // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
          // and need `project:releases` and `org:read` scopes
          authToken: env.PUBLIC_SENTRY_AUTH_TOKEN,
          sourcemaps: {
            // Specify the directory containing build artifacts
            assets: './dist/**',
          },
          // Optionally uncomment the line below to override automatic release name detection
          release: env.PUBLIC_APPLICATION_ENVIRONMENT,
        }),
    ],
  }
})
