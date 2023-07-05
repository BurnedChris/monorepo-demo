# 📁 Everfund Dashboard and API

## Purpose

The everfund Dashboard (hosted at [https://everfund.com](https://everfund.com)) allows nonprofit users to log onto a dashboard and see donations that have been made using the [Donation Gateway](https://github.com/everfund/donation-gateway)

## Stack

- Redwood - [docs](https://redwoodjs.com/docs/introduction)
- Stripe - [docs](https://stripe.com/docs)
- @Tanstack/Table [docs](https://tanstack.com/table/latest/docs/react)
- @Tanstack/Query [docs](https://tanstack.com/query/latest/docs/react)
- XState [docs](https://stately.ai/docs)
- Tailwind - [docs](https://tailwindcss.com/docs/installation)
- Typescript - [docs](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

## Getting Started

Edit .zshrc and add at the bottom

```bash
alias rw="doppler run -- yarn rw"
```

First, run the development server:

```bash
# Run doppler setup to pick your env settings to be auto injected at runtime!
yarn doppler setup

# once you have set up the zshrc configyou can shorten any RedWood command to rw
rw dev
```

that should start a sever on [http://localhost:8910](http://localhost:8910) allowing you to send see the dashboaed.
