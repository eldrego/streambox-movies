// Minimal ambient type for the New Relic browser agent attached to window.
// The full type surface is not shipped by the package; extend as needed.
type NewRelicAttributes = Record<string, string | number | boolean>;

interface Window {
  // Methods are optional: before the agent initialises (or when it is not configured)
  // window.newrelic can be a bare stub without them.
  newrelic?: {
    setCurrentRouteName?(name: string): void;
    addPageAction?(name: string, attributes?: NewRelicAttributes): void;
    noticeError?(error: Error | string, attributes?: NewRelicAttributes): void;
    setCustomAttribute?(name: string, value: string | number | boolean): void;
  };
}
