import type { PropsWithChildren } from 'react';


interface CustomStrongProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}


export const CustomStrong = ({ node, children, ...props }: CustomStrongProps) => {
  return <span className="font-semibold" {...props}>{children}</span>;
};
