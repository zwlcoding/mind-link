import type { PropsWithChildren } from 'react';

export const CustomPre = ({ children }: PropsWithChildren) => {
  // 直接返回子组件，让 CustomCode 负责渲染
  return <>{children}</>;
};

