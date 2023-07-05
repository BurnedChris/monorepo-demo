import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'PUBLIC_',
  server: {},
  client: {
    PUBLIC_COHERENCE_BUILD_SHA: z.string().optional(),
    PUBLIC_APPLICATION_ENVIRONMENT: z.string().optional(),
    PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    PUBLIC_EF_GATEWAY_URL: z.string().min(1),
    PUBLIC_IMAGEKIT_PUBLIC: z.string().min(1),
    PUBLIC_IMAGEKIT_URL: z.string().min(1),
    PUBLIC_SENTRY_WEB_DSN: z.string(),
    PUBLIC_STRIPE_PUBLIC_LIVE: z.string().min(1),
    PUBLIC_CRISP_WEBSITE_ID: z.string().optional(),
  },
  runtimeEnv: process.env,
})
