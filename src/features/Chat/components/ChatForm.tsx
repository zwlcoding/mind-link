import type React from 'react';
import { ModelSelect } from './ModelSelect';

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  isEmpty: boolean;
  models: Array<{ id: string; name: string }>;
  selectedModel: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onModelChange: (modelId: string) => void;
}

export const ChatForm: React.FC<ChatFormProps> = ({
  input,
  isLoading,
  isEmpty,
  models,
  selectedModel,
  onInputChange,
  onSubmit,
  onModelChange,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`p-2 w-full ${isEmpty ? 'max-w-lg mx-auto' : ''}`}
    >
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="text-gray-400 mb-2">
          <textarea
            className="textarea resize-none w-full textarea-ghost"
            placeholder="输入您的消息..."
            value={input}
            onChange={onInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e as unknown as React.FormEvent);
              }
            }}
            disabled={isLoading}
            rows={2}
          ></textarea>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <ModelSelect
              models={models}
              selectedModel={selectedModel}
              onChange={onModelChange}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              type="submit"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                '发送'
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
