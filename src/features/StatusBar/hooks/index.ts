import { useEffect, useState } from 'react';
import { ollama } from '~/engines/ollama';

const useStatusBar = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRunningLen, setIsRunningLen] = useState(0);

  const checkOllamaStatus = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Ollama 健康检查，根据实际 API 可能需要调整
      const res = await ollama.ps();
      setIsOnline(true);
      setIsRunningLen(res.models.length);
    } catch (err) {
      setIsOnline(false);
      setError(err instanceof Error ? err.message : '连接 Ollama 服务失败');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 初始检查
    checkOllamaStatus();

    // 定期检查（每 30 秒）
    const interval = setInterval(checkOllamaStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    isOnline,
    isLoading,
    isRunningLen,
    error,
    refresh: checkOllamaStatus, // 导出刷新函数用于手动检查
  };
};

export default useStatusBar;
