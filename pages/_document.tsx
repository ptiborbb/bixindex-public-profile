import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          />
          {process.env.DATADOG_LOGS_CONFIG && (
            <>
              <script
                key="DD_LOGS"
                type="text/javascript"
                src="https://www.datadoghq-browser-agent.com/datadog-logs.js"
              ></script>
              <script key="DD_LOGS_INIT">
                window.DD_LOGS && DD_LOGS.init(
                {JSON.stringify({
                  service: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
                  version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
                  ...JSON.parse(process.env.DATADOG_LOGS_CONFIG),
                })}
                )
              </script>
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
const a = {
  clientToken: 'pubaa881e39450699427eda861f7d98fa68',
  site: 'datadoghq.eu',
};

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
