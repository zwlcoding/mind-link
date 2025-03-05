import { MessageSquare } from 'lucide-react';

// 空状态组件
export const ChatListEmpty = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
    <MessageSquare className="w-12 h-12 mb-2 opacity-50" />
    <p>暂无对话记录</p>
  </div>
);
