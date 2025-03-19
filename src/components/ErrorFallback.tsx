import type { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div>
        {/* <div>应用程序错误：发生了客户端异常</div> */}
        <div className="mockup-code w-full">
          <pre data-prefix="$" className="bg-warning text-warning-content">
            <code>{t('lng_client_error')}</code>
          </pre>
          <pre data-prefix=">">
            <code> </code>
          </pre>
          <pre data-prefix=">" className="text-error">
            <code>{error.stack}</code>
          </pre>
        </div>
        <div className="m-4 text-center">
          <button className="btn" onClick={resetErrorBoundary}>
            {t('Try again')}
          </button>
        </div>
      </div>
    </div>
  );
};
