// Kept apart from newrelic.ts so the federated MoviesApp chunk can report events
// without bundling the browser agent.

// When federated into the shell, the movies agent never starts (only main.tsx
// calls initNewRelic) and window.newrelic is the shell's agent. Tagging every
// movies event keeps it filterable from the shell's data.
const MOVIES_ATTRIBUTES: NewRelicAttributes = { remote: 'movies' };

/** Report an error to whichever agent is on the page, tagged as coming from movies. */
export function reportError(error: unknown) {
  const reportable = error instanceof Error ? error : String(error);
  window.newrelic?.noticeError?.(reportable, MOVIES_ATTRIBUTES);
}
