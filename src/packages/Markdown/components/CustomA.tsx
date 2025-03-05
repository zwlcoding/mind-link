import type { PropsWithChildren } from 'react';


interface CustomAProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}


export const CustomA = ({ node, children, ...props }: CustomAProps) => {
  return <a className="text-blue-500 hover:underline" target='_blank' rel="noreferrer" {...props}>{children}</a>;
};
