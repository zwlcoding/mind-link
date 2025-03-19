import '~/i18n';
import './index.css';

import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';
import { ErrorFallback } from '~/components/ErrorFallback';
import { RouterConfig } from '~/routes';
import { ToastContainer } from 'react-toastify';

const Bootstrap = () => {
  const onError = (error: any, info: any) => {
    console.error(error, info);
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <RouterProvider router={RouterConfig} />
      <ToastContainer />
    </ErrorBoundary>
  );
};

export default Bootstrap;
