import { memo } from 'react';
import 'highlight.js/styles/github-dark.css';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
// import "katex/dist/katex.min.css"; // 取消注释以启用 KaTeX 样式

import {
  CustomA,
  CustomBlockquote,
  CustomCode,
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
  CustomHr,
  CustomImg,
  CustomLi,
  CustomOl,
  CustomP,
  CustomPre,
  CustomStrong,
  CustomUl,
} from '../components/index';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const NonMemoizeMarkdown = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeHighlight, rehypeKatex]}
      components={{
        a: CustomA,
        blockquote: CustomBlockquote,
        code: CustomCode,
        h1: CustomH1,
        h2: CustomH2,
        h3: CustomH3,
        h4: CustomH4,
        h5: CustomH5,
        h6: CustomH6,
        hr: CustomHr,
        img: CustomImg,
        li: CustomLi,
        ol: CustomOl,
        p: CustomP,
        pre: CustomPre,
        strong: CustomStrong,
        ul: CustomUl,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export const MarkdownRenderer = memo(
  NonMemoizeMarkdown,
  (prevProps, nextProps) => prevProps.content === nextProps.content,
);
