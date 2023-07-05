import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'PUBLIC_',
  server: {
    DATABASE_URL: z.string().url().min(1),
    DEV_IP: z.string().optional(),
    GRAPHQL_HIVE_API_KEY: z.string().optional(),
    IPSTACK_API_KEY: z.string().min(1),
    POSITIONSTACK_API_KEY: z.string().min(1),
    POSTMARK_API_TOKEN: z.string().min(1),
    SENTRY_API_DSN: z.string().optional(),
    PUBLIC_APPLICATION_ENVIRONMENT: z.string().optional(),
    // everfund URLS
    EF_DASHBOARD_API_URL: z.string().url().min(1),
    EF_PAYMENT_API_URL: z.string().url().min(1),
    EF_ORG_API_URL: z.string().url().min(1),
    FILE_EXPORTS_NAME: z.string().optional(),
    // ImageKit
    IMAGEKIT_SECRET: z.string().min(1),
    // Auth
    CLERK_SECRET_KEY: z.string().min(1),
    EF_BOT_JWT_SIGN_SECRET: z.string().min(1),
    EF_CHECKOUT_JWT_SIGN_SECRET: z.string().min(1),
    // Stripe stuff
    STRIPE_SECRET_LIVE: z.string().min(1),
    STRIPE_SECRET_TEST: z.string().min(1),
    STRIPE_TEST_ACCOUNT_ID: z.string().min(1),
  },
  client: {
    PUBLIC_COHERENCE_BUILD_SHA: z.string().optional(),
    PUBLIC_APPLICATION_ENVIRONMENT: z.string().optional(),
    PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    PUBLIC_EF_GATEWAY_URL: z.string().min(1),
    PUBLIC_IMAGEKIT_PUBLIC: z.string().min(1),
    PUBLIC_IMAGEKIT_URL: z.string().min(1),
    PUBLIC_SENTRY_WEB_DSN: z.string(),
    PUBLIC_STRIPE_PUBLIC_LIVE: z.string().min(1),
  },
  runtimeEnv: process.env,
})
