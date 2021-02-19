import { datadogLogs } from '@datadog/browser-logs';

type DatadogLogsConfigEnvVar = { clientToken: string; site: string; env?: string };

if (typeof window !== undefined && process.env.NEXT_PUBLIC_DATADOG_LOGS_CONFIG) {
  datadogLogs.init({
    service: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || undefined,
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,
    forwardErrorsToLogs: true,
    ...(JSON.parse(process.env.NEXT_PUBLIC_DATADOG_LOGS_CONFIG) as DatadogLogsConfigEnvVar),
  });
}

datadogLogs.logger.info('loaded');
