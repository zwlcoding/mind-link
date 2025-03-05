import localforage from 'localforage';
import type { ConversationData } from '~/store/messages';

// 创建不同的存储实例
export const chatStorageInstance = localforage.createInstance({
  name: 'mind-link',
  storeName: 'chats',
  description: '存储聊天会话和消息',
});

export const settingsStorageInstance = localforage.createInstance({
  name: 'mind-link',
  storeName: 'settings',
  description: '存储用户设置和首选项',
});

export const modelsStorageInstance = localforage.createInstance({
  name: 'mind-link',
  storeName: 'models',
  description: '存储模型设置和缓存',
});

// 统一的存储键前缀
export const STORAGE_KEYS = {
  CHAT_PREFIX: 'chat:',
  USER_SETTINGS: 'user:settings',
  MODEL_PREFERENCES: 'model:preferences',
};

// 聊天摘要信息接口，用于列表显示
export interface ChatSummary {
  id: string;
  title: string;
  previewText: string;
  messageCount: number;
  createdAt: number;
  updatedAt: number;
}

// 通用存储操作
export const storageService = {
  // 聊天相关操作
  chats: {
    // 保存会话
    saveChat: async (chatId: string, data: ConversationData): Promise<void> => {
      await chatStorageInstance.setItem(
        `${STORAGE_KEYS.CHAT_PREFIX}${chatId}`,
        data,
      );
    },

    // 获取会话
    getChat: async <T>(chatId: string): Promise<T | null> => {
      return chatStorageInstance.getItem<T>(
        `${STORAGE_KEYS.CHAT_PREFIX}${chatId}`,
      );
    },

    // 删除会话
    removeChat: async (chatId: string): Promise<void> => {
      await chatStorageInstance.removeItem(
        `${STORAGE_KEYS.CHAT_PREFIX}${chatId}`,
      );
    },

    // 获取所有会话的基本信息，按更新时间降序排序
    getAllChats: async (): Promise<ChatSummary[]> => {
      const chats: ChatSummary[] = [];

      await chatStorageInstance.iterate<ConversationData, void>(
        (conversation, key) => {
          // 只处理聊天会话
          if (key.startsWith(STORAGE_KEYS.CHAT_PREFIX)) {
            const chatId = key.slice(STORAGE_KEYS.CHAT_PREFIX.length);

            // 获取最后一条消息作为预览
            const lastMessage =
              conversation.messages.length > 0
                ? conversation.messages[conversation.messages.length - 1]
                : null;

            // 创建聊天摘要
            chats.push({
              id: chatId,
              title: conversation.title || '未命名对话',
              previewText: lastMessage
                ? lastMessage.content.length > 100
                  ? lastMessage.content.slice(0, 100) + '...'
                  : lastMessage.content
                : '空对话',
              messageCount: conversation.messages.length,
              createdAt: conversation.createdAt,
              updatedAt: conversation.updatedAt,
            });
          }
        },
      );

      // 按更新时间降序排序（最新的在前面）
      return chats.sort((a, b) => b.updatedAt - a.updatedAt);
    },

    // 获取所有会话IDs (过滤以 CHAT_PREFIX 开头的键)
    getAllChatIds: async (): Promise<string[]> => {
      const keys: string[] = [];
      await chatStorageInstance.iterate((value, key) => {
        if (key.startsWith(STORAGE_KEYS.CHAT_PREFIX)) {
          keys.push(key.slice(STORAGE_KEYS.CHAT_PREFIX.length));
        }
      });
      return keys;
    },

    // 更新会话标题
    updateChatTitle: async (
      chatId: string,
      newTitle: string,
    ): Promise<boolean> => {
      try {
        const conversation =
          await chatStorageInstance.getItem<ConversationData>(
            `${STORAGE_KEYS.CHAT_PREFIX}${chatId}`,
          );

        if (!conversation) return false;

        conversation.title = newTitle;
        conversation.updatedAt = Date.now();

        await chatStorageInstance.setItem(
          `${STORAGE_KEYS.CHAT_PREFIX}${chatId}`,
          conversation,
        );
        return true;
      } catch (error) {
        console.error('Failed to update chat title:', error);
        return false;
      }
    },

    // 清除所有会话
    clearAllChats: async (): Promise<void> => {
      await chatStorageInstance.clear();
    },
  },

  // 设置相关操作
  settings: {
    // 保存设置
    saveSettings: async (settings: any): Promise<void> => {
      await settingsStorageInstance.setItem(
        STORAGE_KEYS.USER_SETTINGS,
        settings,
      );
    },

    // 获取设置
    getSettings: async <T>(): Promise<T | null> => {
      return settingsStorageInstance.getItem<T>(STORAGE_KEYS.USER_SETTINGS);
    },
  },

  // 模型相关操作
  models: {
    // 保存模型偏好
    saveModelPreferences: async (preferences: any): Promise<void> => {
      await modelsStorageInstance.setItem(
        STORAGE_KEYS.MODEL_PREFERENCES,
        preferences,
      );
    },

    // 获取模型偏好
    getModelPreferences: async <T>(): Promise<T | null> => {
      return modelsStorageInstance.getItem<T>(STORAGE_KEYS.MODEL_PREFERENCES);
    },
  },
};
