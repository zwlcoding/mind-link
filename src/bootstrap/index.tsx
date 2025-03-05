import '~/i18n';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router';
import { ErrorFallback } from '~/components/common/ErrorFallback';
import { Routing } from '~/routes';

import { SiteHeader } from '~/components/common/SiteHeader';
import { Layout } from '~/components/ui/Layout';
import StatusBar from '~/features/StatusBar';

const queryClient = new QueryClient();

const Bootstrap = () => {
  const onError = (error: any, info: any) => {
    console.error(error, info);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Layout.Header>
              <SiteHeader />
            </Layout.Header>
            <Layout.Main>
              <Routing />
            </Layout.Main>
            <Layout.Footer>
              <StatusBar />
            </Layout.Footer>
          </Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default Bootstrap;
