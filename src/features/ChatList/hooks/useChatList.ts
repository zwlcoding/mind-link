import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useChatListStore } from '~/store/chatList';

export const useChatList = () => {
  const { chats, isLoading, loadAllChats, deleteChat, updateChatTitle } =
    useChatListStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 初始加载聊天列表
  useEffect(() => {
    loadAllChats();

    // 创建一个每分钟自动刷新的机制，以确保列表保持最新
    const intervalId = setInterval(() => {
      loadAllChats();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [loadAllChats]);

  // 根据当前路径设置选中的聊天
  useEffect(() => {
    const match = location.pathname.match(/\/chat\/([^/]+)/);
    if (match && match[1]) {
      setSelectedChatId(match[1]);
    } else {
      setSelectedChatId(null);
    }
  }, [location.pathname]);

  // 处理聊天点击
  const handleChatClick = (chatId: string) => {
    setSelectedChatId(chatId);
    navigate(`/chat/${chatId}`);
  };

  // 处理删除点击
  const handleDeleteClick = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmId(chatId);
  };

  // 确认删除
  const confirmDelete = async (chatId: string) => {
    await deleteChat(chatId);
    setDeleteConfirmId(null);

    // 如果删除的是当前选中的聊天，则清除选中状态
    if (chatId === selectedChatId) {
      setSelectedChatId(null);
      navigate('/');
    }
  };

  // 取消删除确认
  const cancelDelete = () => {
    setDeleteConfirmId(null);
    setEditingId(null); // 同时取消编辑模式
  };

  // 开始编辑标题
  const startEditing = (
    chatId: string,
    currentTitle: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setEditingId(chatId);
    setEditingTitle(currentTitle);
  };

  // 保存编辑后的标题
  const saveTitle = async (chatId: string) => {
    if (editingTitle.trim()) {
      await updateChatTitle(chatId, editingTitle.trim());
    }
    setEditingId(null);
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingId(null);
  };

  // 处理标题输入变化
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  // 处理标题编辑键盘事件
  const handleTitleKeyDown = (chatId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle(chatId);
    } else if (e.key === 'Escape') {
      cancelDelete(); // 使用取消函数来退出编辑模式
    }
  };

  return {
    chats,
    isLoading,
    editingId,
    editingTitle,
    deleteConfirmId,
    selectedChatId,
    handleChatClick,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    startEditing,
    saveTitle,
    cancelEditing,
    handleTitleChange,
    handleTitleKeyDown,
    refreshList: loadAllChats,
  };
};
