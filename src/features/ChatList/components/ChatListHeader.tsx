// 头部组件
export const ChatListHeader = ({ onRefresh }: { onRefresh: () => void }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">对话历史</h2>
    <button
      onClick={onRefresh}
      className="btn btn-sm btn-ghost"
      aria-label="刷新列表"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
        />
      </svg>
    </button>
  </div>
);
