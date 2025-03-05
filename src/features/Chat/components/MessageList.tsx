import type React from 'react';
import type { RefObject } from 'react';
import type { Message } from '~/store/messages';
import { LoadingIndicator } from './LoadingIndicator';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  messagesEndRef,
}) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};
