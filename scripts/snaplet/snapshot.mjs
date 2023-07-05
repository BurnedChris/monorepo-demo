#!/usr/bin/env zx
import {
  createSnapletConfigFiles,
  makeSnapshot,
  removeSnapletConfig,
  snapletLog,
} from './shared-libs.mjs';

$.verbose = true;

console.log($.env.COHERENCE_ENVIRONMENT_NAME);
if ($.env.COHERENCE_ENVIRONMENT_NAME === 'production') {
  try {
    await createSnapletConfigFiles();
    await makeSnapshot();
    await removeSnapletConfig();
  } catch (e) {
    throw e;
  }
} else {
  snapletLog('Skipped Snapshot. you are not in the production environment.');
}
