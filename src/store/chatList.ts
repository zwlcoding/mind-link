import { produce } from 'immer';
import { create } from 'zustand';
import { type ChatSummary, storageService } from '~/services/storage';

interface ChatListState {
  chats: ChatSummary[];
  isLoading: boolean;

  loadAllChats: () => Promise<void>;
  deleteChat: (chatId: string) => Promise<boolean>;
  updateChatTitle: (chatId: string, newTitle: string) => Promise<boolean>;
}

export const useChatListStore = create<ChatListState>((set, get) => ({
  chats: [],
  isLoading: false,

  // 加载所有聊天
  loadAllChats: async () => {
    set({ isLoading: true });
    try {
      const chats = await storageService.chats.getAllChats();
      set({ chats });
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 删除聊天
  deleteChat: async (chatId: string) => {
    set({ isLoading: true });
    try {
      await storageService.chats.removeChat(chatId);

      // 更新状态，从列表中移除删除的聊天
      set(
        produce((state: ChatListState) => {
          state.chats = state.chats.filter((chat) => chat.id !== chatId);
        }),
      );

      return true;
    } catch (error) {
      console.error('Failed to delete chat:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // 更新聊天标题
  updateChatTitle: async (chatId: string, newTitle: string) => {
    set({ isLoading: true });
    try {
      const success = await storageService.chats.updateChatTitle(
        chatId,
        newTitle,
      );

      if (success) {
        // 更新状态中的聊天标题
        set(
          produce((state: ChatListState) => {
            const chat = state.chats.find((c) => c.id === chatId);
            if (chat) {
              chat.title = newTitle;
            }
          }),
        );
      }

      return success;
    } catch (error) {
      console.error('Failed to update chat title:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
