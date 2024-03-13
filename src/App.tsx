import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React from "react";
import CustomLoader from "./core/components/Loader";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "./core/config/i18n";
import SettingsProvider from "./core/contexts/SettingsProvider";
import QueryWrapper from "./core/components/QueryWrapper";
import AppRoutes from "./AppRoutes";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

export default function App() {
  return (
    <React.Suspense fallback={<CustomLoader />}>
      <Sentry.ErrorBoundary
        fallback={({ error, componentStack, resetError }) => (
          <div>
            <h1>Something went wrong</h1>
            <p>{error.toString()}</p>
            <p>{componentStack}</p>
            <button onClick={resetError}>Try again</button>
          </div>
        )}
      >
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <SettingsProvider>
              <QueryWrapper>
                {/* AuthProvider Before AppRoutes */}
                <AppRoutes />
              </QueryWrapper>
            </SettingsProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </Sentry.ErrorBoundary>
    </React.Suspense>
  );
}
