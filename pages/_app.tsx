import { createBixindexClient } from '@codingsans/bixindex-common';
import App, { AppProps } from 'next/app';
import { useMemo, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';
import { toast, ToastContainer } from 'react-toastify';
import { appWithTranslation, useTranslation } from '../i18n';
import { AppReducer } from '../store/reducer';
import { appReducer, initialAppState } from '../store/state';
import '../styles/globals.scss';
import { AppContext } from '../shared/app.context';
import { TranslateContext } from '../shared/translate.context';
import { authServiceFactory } from '../shared/services/auth.service';
import { publicProfileServiceFactory } from '../shared/services/public-profile.service';
import { ratingServiceFactory } from '../shared/services/rating.service';
import createPalette from '@material-ui/core/styles/createPalette';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const BixIndexPublicProfile = ({ Component, pageProps }: AppProps): JSX.Element => {
  const [state, dispatch] = useReducer<AppReducer>(appReducer, {
    ...initialAppState,
    auth: { ...initialAppState.auth, user: pageProps.user },
  });
  const { t, i18n } = useTranslation('common');

  const bixClient = useMemo(() => createBixindexClient({ baseURL: '/api', responseInterceptors: [] }), []);
  const authService = useMemo(() => authServiceFactory(bixClient, dispatch), [bixClient]);
  const publicProfileService = useMemo(() => publicProfileServiceFactory(bixClient, dispatch), [bixClient]);
  const ratingService = useMemo(() => ratingServiceFactory(bixClient, dispatch), [bixClient]);

  const theme = createMuiTheme({
    props: {
      MuiCard: {
        elevation: 4,
      },
      MuiAccordion: {
        elevation: 4,
      },
      MuiTextField: {
        InputLabelProps: {
          shrink: true,
        },
        variant: 'outlined',
      },
      MuiButton: {
        variant: 'contained',
        color: 'secondary',
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
          <Component {...pageProps} />
          <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} hideProgressBar={true} />
        </TranslateContext.Provider>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

BixIndexPublicProfile.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(BixIndexPublicProfile);
