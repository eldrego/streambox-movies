import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent';

const NEW_RELIC_BEACON = 'bam.nr-data.net';

/**
 * Start the New Relic browser agent for standalone runs of movies.
 * Call before rendering so the agent instruments everything that follows.
 */
export function initNewRelic() {
  const accountID = import.meta.env.VITE_NEW_RELIC_ACCOUNT_ID;
  const licenseKey = import.meta.env.VITE_NEW_RELIC_LICENSE_KEY;
  const applicationID = import.meta.env.VITE_NEW_RELIC_APP_ID;
  const agentID = import.meta.env.VITE_NEW_RELIC_AGENT_ID;
  const trustKey = import.meta.env.VITE_NEW_RELIC_TRUST_KEY;

  // Skip initialisation if credentials are not configured.
  // This prevents errors in local dev before New Relic is set up.
  if (!licenseKey || !applicationID || !accountID) return;

  new BrowserAgent({
    init: {
      distributed_tracing: { enabled: true },
      privacy: { cookies_enabled: true },
      ajax: { deny_list: [NEW_RELIC_BEACON] },
      // SPA monitoring tracks route changes and async interactions automatically
      soft_navigations: { enabled: true },
    },
    info: {
      beacon: NEW_RELIC_BEACON,
      errorBeacon: NEW_RELIC_BEACON,
      licenseKey,
      applicationID,
      sa: 1,
    },
    loader_config: {
      accountID,
      trustKey: trustKey || accountID,
      agentID: agentID || applicationID,
      licenseKey,
      applicationID,
    },
  });
}
