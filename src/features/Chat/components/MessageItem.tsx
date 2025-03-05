import 'highlight.js/styles/github.css';
import { MarkdownRenderer } from '~/packages/Markdown';
import type { Message } from '~/store/messages'; // 从 store 中导入 Message 类型

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { role, content, hasThinking, thinking } = message;

  return (
    <div className="mb-4">
      {hasThinking && thinking && (
        <div className={`chat ${role === 'user' ? 'chat-end' : 'chat-start'}`}>
          <div className="chat-bubble chat-bubble-accent opacity-75 italic text-sm">
            <div className="font-semibold mb-1">思考过程:</div>
            <MarkdownRenderer content={thinking} />
          </div>
        </div>
      )}
      <div
        className={`chat ${role === 'user' ? 'chat-end' : 'chat-start'} mt-2`}
      >
        <div className="flex flex-col gap-4 w-full">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  );
};
