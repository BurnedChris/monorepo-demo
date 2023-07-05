import { ServerClient } from 'postmark'
import { env } from 'src/env'
import Stripe from 'stripe'

// Creates a new Stripe client for use in the API.
// Returns a new Stripe client with the appropriate API version and
// authentication credentials, depending on whether the API is in live or
// test mode. If the Stripe account ID is provided, the client will be
// configured to use that account's credentials.
export const stripeClient = (liveMode: boolean) =>
  new Stripe(liveMode ? env.STRIPE_SECRET_LIVE : env.STRIPE_SECRET_TEST, {
    // ignore as it is them trying to force us up
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    apiVersion: '2020-08-27',
    typescript: true,
  })

// This is the code that sends emails from the
// application to customers using the Postmark API.
export const postmarkClient = new ServerClient(env.POSTMARK_API_TOKEN)
