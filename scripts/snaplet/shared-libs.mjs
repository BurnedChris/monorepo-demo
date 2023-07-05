#!/usr/bin/env zx
export const sentryLog = (string) =>
  console.log(chalk.blue(`[sentry]: `) + chalk.white(string));
export const snapletLog = (string) =>
  console.log(chalk.green(`[snaplet]: `) + chalk.white(string));

export const sentryCheckin = async (status) => {
  const sentryCheckinCronId = $.env.SENTRY_SNAPLET_CRON_ID;
  const sentryCheckinCronDSN = $.env.SENTRY_SNAPLET_CRON_DSN;

  sentryLog(`started sentry checkin with status: ${status}`);
  $`curl -X POST \
  'https://sentry.io/api/0/organizations/everfundcom/monitors/${sentryCheckinCronId}/checkins/' \
  --header 'Authorization: DSN ${sentryCheckinCronDSN}' \
  --header 'Content-Type: application/json' \
  --data-raw '{"status": "${status}"}'`;
  sentryLog(`finished sentry checkin with status: ${status}`);
};

export const createSnapletConfigFiles = async () => {
  const snapletConfig = JSON.stringify({
    publicKey: $.env.SNAPLET_PUBLIC_RSA_KEY?.replace(/\r?\n/g, '\\n'),
    projectId: $.env.SNAPLET_PROJECT_ID,
    targetDatabaseUrl: $.env.DATABASE_URL,
    sourceDatabaseUrl: $.env.DATABASE_URL,
  });

  await $`yarn -v`;
  const snapletVersion = await $`yarn dlx snaplet --version`;

  const snapletVersionNormalized = snapletVersion
    .toString()
    .replace(/\r?\n/g, '');

  const snapletVersionJson = JSON.stringify({
    version: snapletVersionNormalized,
  });
  const snapletDirectory = `.snaplet`;

  const transformDirectory = $.env.SNAPLET_SOURCE;

  await $`mkdir -p ${snapletDirectory}`;
  await $`echo ${snapletConfig} >${snapletDirectory}/config.json`;
  await $`echo ${$.env.SNAPLET_PRIVATE_RSA_KEY} >${snapletDirectory}/id_rsa`;
  await $`echo ${snapletVersionJson} >${snapletDirectory}/manifest.json`;
  try {
    await $`cp ${transformDirectory}/transform.ts ${snapletDirectory}/transform.ts`;
    // $`cp ${transformDirectory}/structure.ts ${snapletDirectory}/structure.d.ts`
  } catch (e) {}
};

export const makeSnapshot = async () => {
  await $`yarn dlx snaplet snapshot capture`;
  await $`yarn dlx snaplet snapshot share --latest`;
};

export const removeSnapletConfig = async () => {
  await $`rm -r ${snapletDirectory}`;
};
