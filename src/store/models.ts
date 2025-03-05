import { produce } from 'immer';
import { create } from 'zustand';
import { storageService } from '~/services/storage';

// 模型类型
export type ModelType = 'llm' | 'embedding' | 'multimodal';

// 基础模型接口
export interface Model {
  id: string;
  name: string;
  provider: string;
  description?: string;
  maxTokens?: number;
}

// 大语言模型
export interface LlmModel extends Model {
  type: 'llm';
  capabilities?: string[]; // 如 'chat', 'completion' 等
}

// 文本嵌入模型
export interface EmbeddingModel extends Model {
  type: 'embedding';
  dimensions?: number; // 嵌入维度
}

// 多模态模型
export interface MultimodalModel extends Model {
  type: 'multimodal';
  supportedModalities: string[]; // 如 ['text', 'image', 'audio']
}

// 所有模型类型的联合
export type AnyModel = LlmModel | EmbeddingModel | MultimodalModel;

// 模型偏好设置接口
export interface ModelPreferences {
  lastUsedLlm?: string;
  lastUsedEmbedding?: string;
  lastUsedMultimodal?: string;
  pinnedModels?: string[];
  temperature?: number;
  maxOutputTokens?: number;
}

// Store状态接口
interface ModelState {
  // 当前选择的模型
  currentLlm: LlmModel | null;
  currentEmbedding: EmbeddingModel | null;
  currentMultimodal: MultimodalModel | null;

  // 可用模型列表
  availableLlms: LlmModel[];
  availableEmbeddings: EmbeddingModel[];
  availableMultimodals: MultimodalModel[];

  // 加载状态
  isLoading: boolean;

  // 模型偏好
  preferences: ModelPreferences;

  // 方法
  setCurrentModel: (type: ModelType, modelId: string) => void;
  setAvailableModels: (type: ModelType, models: AnyModel[]) => void;
  fetchAvailableModels: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  loadPreferences: () => Promise<void>;
  savePreferences: () => Promise<void>;
  updatePreferences: (updates: Partial<ModelPreferences>) => void;
}

// 默认模型数据
const defaultLlms: LlmModel[] = [
  {
    id: 'deepseek-r1:14b',
    name: 'deepseek-r1',
    provider: 'Ollama',
    type: 'llm',
    description: '能力与成本平衡的选择',
    maxTokens: 4096,
  },
];

const defaultEmbeddings: EmbeddingModel[] = [
  {
    id: 'nomic-embed-text:latest',
    name: 'nomic-embed-text',
    provider: 'Ollama',
    type: 'embedding',
    dimensions: 1536,
    description: '高质量的文本嵌入模型',
  },
];

const defaultMultimodals: MultimodalModel[] = [
  {
    id: 'minicpm-v:latest',
    name: 'minicpm-v',
    provider: 'Ollama',
    type: 'multimodal',
    supportedModalities: ['text', 'image'],
    description: '可以理解文本和图像的多模态模型',
  },
];

// 默认偏好设置
const defaultPreferences: ModelPreferences = {
  lastUsedLlm: 'deepseek-r1:14b',
  temperature: 0.7,
  maxOutputTokens: 2048,
};

// 创建模型管理store
export const useModelStore = create<ModelState>((set, get) => ({
  // 初始状态
  currentLlm: defaultLlms[0],
  currentEmbedding: defaultEmbeddings[0],
  currentMultimodal: defaultMultimodals[0],

  availableLlms: defaultLlms,
  availableEmbeddings: defaultEmbeddings,
  availableMultimodals: defaultMultimodals,

  isLoading: false,
  preferences: defaultPreferences,

  // 设置当前使用的模型
  setCurrentModel: (type, modelId) =>
    set(
      produce((state: ModelState) => {
        const findModel = (models: AnyModel[]) =>
          models.find((m) => m.id === modelId) || null;

        switch (type) {
          case 'llm':
            state.currentLlm = findModel(state.availableLlms) as LlmModel;
            // 更新上次使用的模型
            state.preferences.lastUsedLlm = modelId;
            break;
          case 'embedding':
            state.currentEmbedding = findModel(
              state.availableEmbeddings,
            ) as EmbeddingModel;
            state.preferences.lastUsedEmbedding = modelId;
            break;
          case 'multimodal':
            state.currentMultimodal = findModel(
              state.availableMultimodals,
            ) as MultimodalModel;
            state.preferences.lastUsedMultimodal = modelId;
            break;
        }
      }),
    ),

  // 设置可用模型列表
  setAvailableModels: (type, models) =>
    set(
      produce((state: ModelState) => {
        switch (type) {
          case 'llm':
            state.availableLlms = models as LlmModel[];
            // 如果当前选择的模型不在新列表中，选择第一个
            if (
              state.currentLlm &&
              !models.some((m) => m.id === state.currentLlm?.id)
            ) {
              state.currentLlm =
                models.length > 0 ? (models[0] as LlmModel) : null;
            }
            break;
          case 'embedding':
            state.availableEmbeddings = models as EmbeddingModel[];
            if (
              state.currentEmbedding &&
              !models.some((m) => m.id === state.currentEmbedding?.id)
            ) {
              state.currentEmbedding =
                models.length > 0 ? (models[0] as EmbeddingModel) : null;
            }
            break;
          case 'multimodal':
            state.availableMultimodals = models as MultimodalModel[];
            if (
              state.currentMultimodal &&
              !models.some((m) => m.id === state.currentMultimodal?.id)
            ) {
              state.currentMultimodal =
                models.length > 0 ? (models[0] as MultimodalModel) : null;
            }
            break;
        }
      }),
    ),

  // 获取可用模型（模拟API请求）
  fetchAvailableModels: async () => {
    const { setIsLoading } = get();
    setIsLoading(true);

    try {
      // 这里可以替换为实际的API调用
      // const response = await api.getModels();

      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 使用默认数据（实际应用中应替换为API返回的数据）
      set({
        availableLlms: defaultLlms,
        availableEmbeddings: defaultEmbeddings,
        availableMultimodals: defaultMultimodals,
      });
    } catch (error) {
      console.error('获取模型失败:', error);
    } finally {
      setIsLoading(false);
    }
  },

  setIsLoading: (isLoading) => set({ isLoading }),

  // 加载用户偏好设置
  loadPreferences: async () => {
    try {
      const savedPreferences =
        await storageService.models.getModelPreferences<ModelPreferences>();

      if (savedPreferences) {
        set({ preferences: { ...defaultPreferences, ...savedPreferences } });

        // 如果有上次选择的模型，应用它
        const { preferences } = get();
        if (preferences.lastUsedLlm) {
          get().setCurrentModel('llm', preferences.lastUsedLlm);
        }
      }
    } catch (error) {
      console.error('加载偏好设置失败:', error);
    }
  },

  // 保存用户偏好设置
  savePreferences: async () => {
    try {
      const { preferences } = get();
      await storageService.models.saveModelPreferences(preferences);
    } catch (error) {
      console.error('保存偏好设置失败:', error);
    }
  },

  // 更新偏好设置
  updatePreferences: (updates) => {
    set(
      produce((state: ModelState) => {
        state.preferences = { ...state.preferences, ...updates };
      }),
    );

    // 保存更新后的设置
    get().savePreferences();
  },
}));

// 初始化钩子 - 可以在应用启动时调用
export const initializeModelStore = () => {
  const { loadPreferences } = useModelStore.getState();
  loadPreferences();
};
