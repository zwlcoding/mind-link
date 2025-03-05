import { useTranslation } from 'react-i18next';
import { useMessageStore } from '~/store/messages';
import useStatusBar from './hooks';

const StatusBar = () => {
  const { isLoading, messages } = useMessageStore();
  const { isOnline, isRunningLen } = useStatusBar();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center">
        <span
          className={`badge ${isOnline ? (isLoading ? 'badge-warning' : 'badge-success') : 'badge-error'} mr-2`}
        >
          {isOnline ? (isLoading ? '处理中' : `${'已连接'}`) : '未连接'}
        </span>
        {isRunningLen > 0 && <span>run models: {isRunningLen}</span>}
      </div>
      {isOnline && (
        <div className="flex items-center">
          <span className="mr-4">
            {t('消息数')}:{messages.length}
          </span>
          <span>
            {t('状态')}: {isLoading ? '生成回复中...' : '空闲'}
          </span>
        </div>
      )}
    </>
  );
};

export default StatusBar;
