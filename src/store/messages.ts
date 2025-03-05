import { produce } from 'immer';
import { create } from 'zustand';
import { storageService } from '~/services/storage';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'bot';
  content: string;
  hasThinking?: boolean;
  thinking?: string;
}

export interface ConversationData {
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  title?: string;
}

interface MessageState {
  isLoading: boolean;
  currentChatId: string | null;
  conversations: Record<string, ConversationData>;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentChatId: (chatId: string) => void;

  messages: Message[]; // 当前对话的消息

  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;

  // 会话管理
  loadConversation: (chatId: string) => Promise<boolean>;
  saveCurrentConversation: () => Promise<void>;
  createNewConversation: (chatId: string) => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  isLoading: false,
  currentChatId: null,
  conversations: {},
  messages: [],

  setIsLoading: (isLoading) => set({ isLoading }),

  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),

  addMessage: (message) =>
    set(
      produce((state: MessageState) => {
        state.messages.push(message);

        // 如果有当前会话ID，更新会话数据
        if (state.currentChatId) {
          if (!state.conversations[state.currentChatId]) {
            state.conversations[state.currentChatId] = {
              messages: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
          }

          state.conversations[state.currentChatId].messages.push(message);
          state.conversations[state.currentChatId].updatedAt = Date.now();
        }
      }),
    ),

  updateMessage: (id, updates) =>
    set(
      produce((state: MessageState) => {
        const messageIndex = state.messages.findIndex((msg) => msg.id === id);
        if (messageIndex !== -1) {
          Object.assign(state.messages[messageIndex], updates);

          // 更新会话中的消息
          if (state.currentChatId && state.conversations[state.currentChatId]) {
            const convMsgIndex = state.conversations[
              state.currentChatId
            ].messages.findIndex((msg) => msg.id === id);
            if (convMsgIndex !== -1) {
              Object.assign(
                state.conversations[state.currentChatId].messages[convMsgIndex],
                updates,
              );
              state.conversations[state.currentChatId].updatedAt = Date.now();
            }
          }
        }
      }),
    ),

  clearMessages: () =>
    set(
      produce((state: MessageState) => {
        state.messages = [];

        // 清空当前会话
        if (state.currentChatId && state.conversations[state.currentChatId]) {
          state.conversations[state.currentChatId].messages = [];
          state.conversations[state.currentChatId].updatedAt = Date.now();
        }
      }),
    ),

  // 加载指定ID的会话
  loadConversation: async (chatId) => {
    const state = get();

    // 检查内存中是否已有此会话
    if (state.conversations[chatId]) {
      set({
        currentChatId: chatId,
        messages: state.conversations[chatId].messages,
      });
      return true;
    }

    // 使用新的存储服务从localforage加载
    try {
      const conversationData =
        await storageService.chats.getChat<ConversationData>(chatId);

      if (conversationData) {
        // 更新会话记录和当前消息
        set(
          produce((state: MessageState) => {
            state.conversations[chatId] = conversationData;
            state.currentChatId = chatId;
            state.messages = conversationData.messages;
          }),
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error('Failed to load conversation:', error);
      return false;
    }
  },

  // 保存当前会话到localforage
  saveCurrentConversation: async () => {
    const { currentChatId, conversations } = get();

    if (!currentChatId || !conversations[currentChatId]) {
      return;
    }

    try {
      // 使用新的存储服务保存会话
      await storageService.chats.saveChat(
        currentChatId,
        conversations[currentChatId],
      );
    } catch (error) {
      console.error('Failed to save conversation:', error);
    }
  },

  // 创建新会话
  createNewConversation: (chatId) => {
    set(
      produce((state: MessageState) => {
        state.messages = [];
        state.currentChatId = chatId;
        state.conversations[chatId] = {
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          title: '新的对话',
        };
      }),
    );
  },
}));
