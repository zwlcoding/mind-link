import type { PropsWithChildren } from 'react';


interface CustomOlProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}


export const CustomOl = ({ node, children, ...props }: CustomOlProps) => {
  return <ol className="list-decimal list-outside ml-4" {...props}>{children}</ol>;
};

