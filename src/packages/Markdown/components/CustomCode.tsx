import type { PropsWithChildren } from 'react';
import { useState } from 'react';

// import { FiCheck, FiCopy } from 'react-icons/fi';

interface CodeProps extends PropsWithChildren {
  node?: any;
  className?: string;
}

export const CustomCode = ({
  node,
  className,
  children,
  ...props
}: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';

  const handleCopy = () => {
    if (typeof children === 'string' || Array.isArray(children)) {
      const codeText = Array.isArray(children) ? children.join('') : children;

      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('无法复制代码: ', err);
        });
    }
  };

  // 代码块
  return match ? (
    <div className="relative group">
      <div className="absolute right-2 top-2 flex items-center z-10">
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-2">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded"
          title="复制代码"
        >
          {/* {copied ? <FiCheck className="text-green-500" /> : <FiCopy />} */}
          {copied ? '✓' : '复制'}
        </button>
      </div>
      <div className="mockup-code w-full">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
