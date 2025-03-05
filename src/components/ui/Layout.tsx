import React from 'react';

export type LayoutProps = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

const renderLayoutComp = (
  key: 'LayoutHeader' | 'LayoutMain' | 'LayoutFooter',
  children?: React.ReactNode,
) => {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;
    // @ts-ignore
    if ([key].includes(child.type.displayName)) {
      return child;
    }
    return null;
  });
};

// header
export const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between bg-base-200 border-b border-base-300 text-sm">
      {children}
    </div>
  );
};
LayoutHeader.displayName = 'LayoutHeader';

// main
export const LayoutMain = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-1 overflow-hidden">{children}</div>;
};
LayoutMain.displayName = 'LayoutMain';

// footer
export const LayoutFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between bg-base-200 border-t border-base-300 text-sm">
      {children}
    </div>
  );
};
LayoutFooter.displayName = 'LayoutFooter';

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* 顶部 */}
      {renderLayoutComp('LayoutHeader', children)}

      {/* 主要内容区域：侧边栏+主面板 */}
      {renderLayoutComp('LayoutMain', children)}

      {/* 底部状态栏 */}
      {renderLayoutComp('LayoutFooter', children)}
    </div>
  );
};
Layout.displayName = 'Layout';
Layout.Header = LayoutHeader;
Layout.Footer = LayoutFooter;
Layout.Main = LayoutMain;
