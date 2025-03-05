interface ParsedCodeLine {
  prefix: string | null;
  content: string;
  className?: string;
}

/**
 * 解析代码行，支持特殊前缀
 * 格式: $ npm install (表示命令行)
 * 格式: > message (表示输出，可以添加 --warning, --error, --success 来指定颜色)
 * 格式: # comment (表示注释)
 */
export const parseCodeLine = (line: string): ParsedCodeLine => {
  // 检查特殊前缀
  if (line.startsWith('$ ')) {
    return {
      prefix: '$',
      content: line.slice(2),
    };
  } else if (line.startsWith('> ')) {
    let className = '';
    let content = line.slice(2);

    // 检查是否有颜色指示器
    if (content.endsWith(' --warning')) {
      className = 'text-warning';
      content = content.slice(0, -10);
    } else if (content.endsWith(' --error')) {
      className = 'text-error';
      content = content.slice(0, -8);
    } else if (content.endsWith(' --success')) {
      className = 'text-success';
      content = content.slice(0, -10);
    }

    return {
      prefix: '>',
      content,
      className,
    };
  } else if (line.startsWith('# ')) {
    return {
      prefix: '#',
      content: line.slice(2),
      className: 'text-info',
    };
  }

  // 默认没有特殊前缀
  return {
    prefix: '',
    content: line,
  };
};
