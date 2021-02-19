import {
  createBixindexClient,
  EDevelopmentEnvironments,
  EHttpStatus,
  IReponseInterceptor,
} from '@codingsans/bixindex-common';
import { Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { AxiosError, AxiosResponse } from 'axios';
import App, { AppContext as AppGetInitialPropsContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import React, { useEffect, useMemo, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';
import CookieConsent from 'react-cookie-consent';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';
import { appWithTranslation, useTranslation } from '../i18n';
import { AppContext } from '../shared/app.context';
import { useConfig } from '../shared/config.context';
import { setLoggerUserID } from '../shared/datadog';
import { DialogServiceProvider } from '../shared/dialog.context';
import { authServiceFactory } from '../shared/services/auth.service';
import { publicProfileServiceFactory } from '../shared/services/public-profile.service';
import { ratingServiceFactory } from '../shared/services/rating.service';
import { TranslateContext } from '../shared/translate.context';
import { ssrUserIdentity } from '../shared/utils/ssr-helpers/ssr-user-identity';
import { AppReducer } from '../store/reducer';
import { appReducer, initialAppState } from '../store/state';
import '../styles/globals.scss';

const BixIndexPublicProfile = ({ Component, pageProps }: AppProps): JSX.Element => {
  const config = useConfig();
  const router = useRouter();
  useEffect(() => {
    if (window && config.nodeEnv === EDevelopmentEnvironments.PROD) {
      hotjar.initialize(2230800, 6);
    }
  }, []);

  useEffect(() => {
    setLoggerUserID(pageProps?.user?.id);
  }, [pageProps?.user?.id]);

  if (config.sentry.dsn) {
    Sentry.init({
      enabled: config.nodeEnv === EDevelopmentEnvironments.PROD,
      dsn: config.sentry.dsn,
      tracesSampleRate: 1.0,
      integrations: [new Integrations.BrowserTracing()],
    });
  }

  const responseInterceptors: IReponseInterceptor[] = [
    {
      onAccepted: (response: AxiosResponse) => {
        return response;
      },
      onRejected: async (error: AxiosError) => {
        const { status } = error.response;
        if (status !== EHttpStatus.UNAUTHORIZED) {
          Sentry.captureException(error);
          Sentry.flush(2000);
        }
        return Promise.reject(error);
      },
    },
  ];

  const [state, dispatch] = useReducer<AppReducer>(appReducer, {
    ...initialAppState,
    auth: { ...initialAppState.auth, user: pageProps.user },
  });
  const { t, i18n } = useTranslation('common');

  const bixClient = useMemo(() => createBixindexClient({ baseURL: '/api', responseInterceptors }), []);
  const authService = useMemo(() => authServiceFactory(bixClient, dispatch), [bixClient]);
  const publicProfileService = useMemo(() => publicProfileServiceFactory(bixClient, dispatch), [bixClient]);
  const ratingService = useMemo(() => ratingServiceFactory(bixClient, dispatch), [bixClient]);

  useEffect(() => {
    ReactGA.initialize(config.analyticsId, { debug: false });
  }, [config]);

  useEffect(() => {
    ReactGA.set({ page: router.asPath });
    ReactGA.pageview(router.asPath);
  }, [router]);

  const theme = createMuiTheme({
    props: {
      MuiCard: {
        elevation: 4,
      },
      MuiTextField: {
        variant: 'outlined',
      },
      MuiAccordion: {
        elevation: 4,
      },
      MuiButton: {
        variant: 'contained',
        color: 'secondary',
        size: 'large',
        style: {
          padding: '15px',
          width: '17em',
        },
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
    palette: createPalette({
      primary: {
        main: '#5D92F4',
      },
      secondary: {
        main: '#00D014',
        contrastText: '#FFFFFF',
      },
    }),
  });

  return (
    <Sentry.ErrorBoundary fallback={'An error has occured'}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{
            state,
            dispatch,
            authService,
            publicProfileService,
            ratingService,
          }}
        >
          <ContextDevTool context={AppContext} id="bixPublicProfile" displayName="Bix Public Profile" />
          <TranslateContext.Provider value={{ i18n, t }}>
            <SnackbarProvider maxSnack={10} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <DialogServiceProvider>
                <Component {...pageProps} />
              </DialogServiceProvider>
              <CookieConsent
                buttonText={t('COMMON.ACCEPT_COOKIES')}
                ButtonComponent={Button}
                buttonStyle={{ backgroundColor: '#fff', color: '#56aaa6', fontWeight: 'bold' }}
                data-nosnippet
              >
                {t('COMMON.COOKIE_CONSENT')}
              </CookieConsent>
            </SnackbarProvider>
          </TranslateContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  );
};

BixIndexPublicProfile.getInitialProps = async (appGetInitialPropsContext: AppGetInitialPropsContext) => {
  const { ctx } = appGetInitialPropsContext;
  const initialProps = await App.getInitialProps(appGetInitialPropsContext);
  return {
    ...initialProps,
    pageProps: {
      ...initialProps.pageProps,
      user: await ssrUserIdentity(ctx),
    },
  };
};
export default appWithTranslation(BixIndexPublicProfile);
