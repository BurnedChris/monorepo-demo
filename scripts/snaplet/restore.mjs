#!/usr/bin/env zx
import {
  createSnapletConfigFiles,
  removeSnapletConfig,
  snapletLog,
} from './shared-libs.mjs';

$.verbose = false;

if ($.env.COHERENCE_ENVIRONMENT_NAME !== 'production') {
  try {
    await createSnapletConfigFiles();
    await $`yarn snaplet snapshot restore --latest --data-only --yes`;
    await removeSnapletConfig();
  } catch (e) {
    throw e;
  }
} else {
  snapletLog('Skipped Snapshot. You are in the production environment.');
}
