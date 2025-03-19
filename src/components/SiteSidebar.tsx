import { Menu, Plus, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  onCreateNewChat?: () => void; // 新增: 创建新会话的回调函数
  defaultOpen?: boolean; // 新增: 控制侧边栏默认状态
}

export const SiteSidebar = ({
  className = '',
  children,
  onCreateNewChat,
  defaultOpen = false,
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateNewChat = () => {
    if (onCreateNewChat) {
      onCreateNewChat();
    }

    if (window.innerWidth < 768) {
      setIsOpen(false); // 在移动设备上创建新会话后关闭侧边栏
    }
  };

  return (
    <>
      {/* 移动端的汉堡菜单 */}
      <div className="fixed top-4 left-4 md:hidden z-30">
        <button
          onClick={toggleSidebar}
          className="btn btn-circle btn-sm"
          aria-label={isOpen ? '关闭侧边栏' : '打开侧边栏'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 侧边栏 */}
      <aside
        className={`
          fixed top-0 left-0 z-20 h-full bg-gray-100 shadow-lg transition-all duration-300
          transform md:translate-x-0 md:relative md:shadow-none
          ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0'}
          ${className} md:w-72
        `}
      >
        <div className="flex flex-col h-full">
          {/* 侧边栏头部 */}
          {onCreateNewChat && (
            <div className="p-4 border-b hidden md:block">
              <button
                onClick={handleCreateNewChat}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                <span>新建对话</span>
              </button>
            </div>
          )}

          {/* 聊天列表 */}
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </aside>

      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};
