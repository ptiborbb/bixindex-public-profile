import { datadogLogs } from '@datadog/browser-logs';

type DatadogLogsConfigEnvVar = { clientToken: string; site: string; env?: string };

if (typeof window !== undefined && process.env.DATADOG_LOGS_CONFIG) {
  datadogLogs.init({
    service: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || undefined,
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,
    ...(JSON.parse(process.env.DATADOG_LOGS_CONFIG) as DatadogLogsConfigEnvVar),
  });
}
