import { datadogLoggerFactory, IBixLogger } from '@codingsans/bixindex-common';
import { useEffect, useMemo } from 'react';

type DatadogLogsConfigEnvVar = { clientToken: string; site: string; env?: string };

const initializeLogger = (logger: IBixLogger): void => {
  if (process.env.NEXT_PUBLIC_DATADOG_LOGS_CONFIG) {
    const config = JSON.parse(process.env.NEXT_PUBLIC_DATADOG_LOGS_CONFIG) as DatadogLogsConfigEnvVar;
    logger.init({
      serviceName: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || undefined,
      serviceVersion: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || undefined,
      clientToken: config.clientToken,
      logTarget: config.site,
      env: config.env,
    }) as void;
  }
};

export const useLogger = (): IBixLogger => {
  const logger = useMemo(() => datadogLoggerFactory(), []);
  useEffect(() => {
    initializeLogger(logger);
  }, []);
  return logger;
};
