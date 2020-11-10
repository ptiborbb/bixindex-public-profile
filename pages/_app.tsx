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
import App, { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { useMemo, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';
import CookieConsent from 'react-cookie-consent';
import { appWithTranslation, useTranslation } from '../i18n';
import { AppContext } from '../shared/app.context';
import { authServiceFactory } from '../shared/services/auth.service';
import { publicProfileServiceFactory } from '../shared/services/public-profile.service';
import { ratingServiceFactory } from '../shared/services/rating.service';
import { TranslateContext } from '../shared/translate.context';
import { AppReducer } from '../store/reducer';
import { appReducer, initialAppState } from '../store/state';
import '../styles/globals.scss';

const BixIndexPublicProfile = ({ Component, pageProps }: AppProps): JSX.Element => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      enabled: process.env.NEXT_PUBLIC_NODE_ENV === EDevelopmentEnvironments.PROD,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
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
              <Component {...pageProps} />
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

BixIndexPublicProfile.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(BixIndexPublicProfile);
