import 'highlight.js/styles/github.css';
import { ChatForm } from '../components/ChatForm';
import { EmptyState } from '../components/EmptyState';
import { MessageList } from '../components/MessageList';
import { NewChatButton } from '../components/NewChatButton';
import { useChatLogic } from '../hooks/useChatLogic';

export const Chat = () => {
  const {
    input,
    isLoading,
    messages,
    selectedModel,
    models,
    messagesEndRef, // 这是 RefObject<HTMLDivElement> 类型
    handleInputChange,
    handleSubmit,
    startNewConversation,
    setSelectedModel,
  } = useChatLogic();

  const isEmpty = messages.length === 0;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 消息列表 */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      {/* 新对话按钮 */}
      {/* {!isEmpty && (
        <NewChatButton onClick={startNewConversation} />
      )} */}

      {/* 表单区域 */}
      <div className={`${isEmpty ? 'flex-1 flex items-center' : ''}`}>
        <div className="flex-1 flex flex-col">
          {isEmpty && <EmptyState />}
          <ChatForm
            input={input}
            isLoading={isLoading}
            isEmpty={isEmpty}
            models={models}
            selectedModel={selectedModel}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onModelChange={setSelectedModel}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
