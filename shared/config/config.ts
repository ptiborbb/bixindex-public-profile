import * as loadedConfig from '!val-loader!./config-loader';
import { EDevelopmentEnvironments } from '@codingsans/bixindex-common';

export interface IConfig {
  sentry: { dsn: string };
  nodeEnv: EDevelopmentEnvironments;
  blogUrl: string;
  customerPortalUrl: string;
  fbAppId: string;
  googleClientId: string;
  bestUserExperience: string;
  publicProfileUrl: string;
  backendUrl: string;
  analyticsId: string;
}

export const config = loadedConfig as IConfig;
