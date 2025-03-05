import { Calendar, Check, Edit, MessageSquare, Trash2, X } from 'lucide-react';
import { ChatListEmpty } from '../components/ChatListEmpty';
import { ChatListHeader } from '../components/ChatListHeader';
import { ChatListLoading } from '../components/ChatListLoading';
import { useChatList } from '../hooks/useChatList';

export const ChatList = () => {
  const {
    chats,
    isLoading,
    editingId,
    editingTitle,
    deleteConfirmId,
    selectedChatId, // 添加当前选中聊天的ID
    handleChatClick,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    startEditing,
    saveTitle,
    handleTitleChange,
    handleTitleKeyDown,
    refreshList,
  } = useChatList();

  // 格式化日期
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full py-4">
      <ChatListHeader onRefresh={refreshList} />

      {/* 根据状态显示不同内容 */}
      {isLoading && chats.length === 0 ? (
        <ChatListLoading />
      ) : chats.length === 0 ? (
        <ChatListEmpty />
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-custom">
          <ul className="space-y-2 px-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => handleChatClick(chat.id)}
                className={`
                  border rounded-lg p-3 cursor-pointer transition
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  ${deleteConfirmId === chat.id ? 'bg-red-50 dark:bg-red-900/20' : ''}
                  ${selectedChatId === chat.id ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : ''}
                `}
              >
                {deleteConfirmId === chat.id ? (
                  <div className="flex flex-col">
                    <p className="font-medium mb-2">确定要删除这个对话吗？</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(chat.id);
                        }}
                        className="btn btn-sm btn-error flex-1"
                      >
                        删除
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelDelete();
                        }}
                        className="btn btn-sm btn-ghost flex-1"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      {editingId === chat.id ? (
                        <div
                          className="flex items-center flex-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={handleTitleChange}
                            onKeyDown={(e) => handleTitleKeyDown(chat.id, e)}
                            className="input input-sm input-bordered w-full"
                            autoFocus
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              saveTitle(chat.id);
                            }}
                            className="btn btn-sm btn-ghost ml-1"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelDelete();
                            }}
                            className="btn btn-sm btn-ghost"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <h3
                              className="font-medium truncate"
                              title={chat.title}
                            >
                              {chat.title}
                            </h3>
                          </div>
                          <div className="flex space-x-1 ml-2">
                            <button
                              onClick={(e) =>
                                startEditing(chat.id, chat.title, e)
                              }
                              className="btn btn-xs btn-ghost"
                              aria-label="编辑"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDeleteClick(chat.id, e)}
                              className="btn btn-xs btn-ghost text-red-500"
                              aria-label="删除"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* 预览和信息 */}
                    {!editingId && (
                      <>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                          {chat.previewText}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                          <div className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            <span>{chat.messageCount}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{formatDate(chat.updatedAt)}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
