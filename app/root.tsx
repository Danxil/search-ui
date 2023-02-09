import { LiveReload, Outlet, Links, Scripts } from '@remix-run/react';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { cssBundleHref } from '@remix-run/css-bundle';
import React from 'react';

import 'the-new-css-reset/css/reset.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '~/components/global.module.css';

export function Document({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>Comments searcher</title>
          <Links />
        </head>
        <body>
          {children}
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </React.Fragment>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  ];
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
