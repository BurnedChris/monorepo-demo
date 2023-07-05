#!/usr/bin/env zx
import {
  sentryCheckin,
  createSnapletConfigFiles,
  makeSnapshot,
  removeSnapletConfig,
} from './shared-libs.mjs';

$.verbose = false;

if ($.env.COHERENCE_ENVIRONMENT_NAME === 'production') {
  try {
    await sentryCheckin('in_progress');
    await createSnapletConfigFiles();
    await makeSnapshot();
    await removeSnapletConfig();
    await sentryCheckin('ok');
  } catch (e) {
    await sentryCheckin('error');
    throw e;
  }
} else {
  snapletLog('Skipped Snapshot. You are in the production environment.');
}
