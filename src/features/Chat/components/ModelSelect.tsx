interface ModelSelectProps {
  models: Array<{ id: string; name: string }>;
  selectedModel: string;
  onChange: (modelId: string) => void;
}

export const ModelSelect: React.FC<ModelSelectProps> = ({
  models,
  selectedModel,
  onChange,
}) => {
  return (
    <div className="dropdown dropdown-top">
      <div tabIndex={0} className="btn btn-ghost btn-xs opacity-70">
        模型:{' '}
        {models.find((m) => m.id === selectedModel)?.name || selectedModel}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
      >
        {models.map((model) => (
          <li key={model.id}>
            <a
              className={selectedModel === model.id ? 'active' : ''}
              onClick={() => onChange(model.id)}
            >
              {model.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
