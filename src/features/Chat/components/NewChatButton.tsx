import { RefreshCw } from 'lucide-react';

interface NewChatButtonProps {
  onClick: () => void;
}

export const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center my-4">
      <button
        className="btn btn-sm bg-blue-50 text-blue-500 border-none hover:bg-blue-100 gap-2"
        onClick={onClick}
      >
        <RefreshCw className="w-4 h-4" />
        开启新对话
      </button>
    </div>
  );
};
