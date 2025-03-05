import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { ollama } from '~/engines/ollama';
import { type Message, useMessageStore } from '~/store/messages';
import { useModelStore } from '~/store/models';

export const useChatLogic = () => {
  const [input, setInput] = useState('');
  const {
    isLoading,
    setIsLoading,
    messages,
    addMessage,
    updateMessage,
    currentChatId,
    loadConversation,
    saveCurrentConversation,
    createNewConversation,
  } = useMessageStore();

  const { currentLlm, availableLlms } = useModelStore();
  const selectedModel = currentLlm?.id || 'deepseek-r1:14b';

  // 确保 messagesEndRef 类型正确
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  // 初始化加载会话
  useEffect(() => {
    const initializeChat = async () => {
      if (!uuid) return;

      // 尝试加载会话
      const exists = await loadConversation(uuid);

      // 如果会话不存在，则创建新会话
      if (!exists) {
        createNewConversation(uuid);
      }
    };

    initializeChat();
  }, [uuid, loadConversation, createNewConversation]);

  // 保存消息到localforage
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      saveCurrentConversation();
    }
  }, [messages, currentChatId, saveCurrentConversation]);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // 处理用户消息
  const handleUserMessage = (userInput: string) => {
    const userMessageId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: userInput,
    };

    addMessage(userMessage);
    setIsLoading(true);
    setInput(''); // 清空输入框

    return userInput;
  };

  // 创建机器人响应占位消息
  const createBotMessage = () => {
    const botMessageId = `bot-${Date.now()}`;
    addMessage({
      id: botMessageId,
      role: 'assistant', // 修改为 'assistant' 以确保类型兼容
      content: '',
    });
    return botMessageId;
  };

  // 处理流式响应
  const processStreamResponse = async (response: any, botMessageId: string) => {
    let accumulatedContent = '';
    let accumulatedThinking = '';
    let inThinkingMode = false;

    // 使用 for await...of 循环处理流式响应
    for await (const part of response) {
      console.log('Ollama API 响应:', part);
      const content = part.message.content;

      if (content === '<think>') {
        inThinkingMode = true;
        updateMessage(botMessageId, {
          content: accumulatedContent,
          hasThinking: true,
          thinking: accumulatedThinking,
        });
        continue;
      } else if (content === '</think>') {
        inThinkingMode = false;
        continue;
      }

      if (inThinkingMode) {
        accumulatedThinking += content;
        updateMessage(botMessageId, {
          thinking: accumulatedThinking,
        });
      } else {
        accumulatedContent += content;
        updateMessage(botMessageId, {
          content: accumulatedContent,
        });
      }
    }

    // 最终更新消息状态，确保完整性
    updateMessage(botMessageId, {
      content: accumulatedContent,
      ...(accumulatedThinking
        ? { hasThinking: true, thinking: accumulatedThinking }
        : {}),
    });
  };

  // 处理API错误
  const handleApiError = (error: any) => {
    console.error('Ollama API 错误:', error);
    addMessage({
      id: `error-${Date.now()}`,
      role: 'assistant', // 修改为 'assistant' 以确保类型兼容
      content: '抱歉，生成回复时出现错误。请稍后再试。',
    });
  };

  // 准备历史消息
  const prepareHistoryMessages = (userInput: string) => {
    const historyMessages = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    historyMessages.push({ role: 'user', content: userInput });
    return historyMessages;
  };

  // 提交表单处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 处理用户消息
    const userInput = handleUserMessage(input.trim());

    try {
      // 创建机器人响应占位消息
      const botMessageId = createBotMessage();

      // 准备历史消息
      const historyMessages = prepareHistoryMessages(userInput);

      // 发送请求获取流式响应
      const response = await ollama.chat({
        model: selectedModel,
        messages: historyMessages,
        stream: true,
      });

      // 处理流式响应
      await processStreamResponse(response, botMessageId);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 开启新对话
  const startNewConversation = () => {
    const newChatId = uuidv4();
    navigate(`/chat/${newChatId}`);
  };

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 获取经过转换的模型列表，确保有id和name属性
  const models = availableLlms.map((model) => ({
    id: model.id,
    name: model.name || model.id,
  }));

  return {
    input,
    isLoading,
    messages, // 确保这是 Message[] 类型
    selectedModel,
    models,
    messagesEndRef, // 确保这是 RefObject<HTMLDivElement> 类型
    handleInputChange,
    handleSubmit,
    startNewConversation,
    setSelectedModel: (modelId: string) =>
      useModelStore.getState().setCurrentModel('llm', modelId),
  };
};
