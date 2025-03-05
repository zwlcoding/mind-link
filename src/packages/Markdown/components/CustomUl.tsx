import type { PropsWithChildren } from 'react';


interface CustomUlProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}


export const CustomUl = ({ node, children, ...props }: CustomUlProps) => {
  return <ul className="list-decimal list-outside ml-4" {...props}>{children}</ul>;
};
