import '~/i18n';
import './index.css';

import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, RouterProvider } from 'react-router';
import { ErrorFallback } from '~/components/common/ErrorFallback';
import { RouterConfig } from '~/routes';
import { ToastContainer } from 'react-toastify';
import { SiteHeader } from '~/components/common/SiteHeader';
import { Layout } from '~/components/ui/Layout';
import StatusBar from '~/features/StatusBar';

const Bootstrap = () => {
  const onError = (error: any, info: any) => {
    console.error(error, info);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <RouterProvider router={RouterConfig} />
      <ToastContainer />
      {/* <BrowserRouter>
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
      </BrowserRouter> */}
    </ErrorBoundary>
  );
};

export default Bootstrap;
