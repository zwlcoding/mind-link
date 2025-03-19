import type { PropsWithChildren } from 'react';

interface CustomLiProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}

export const CustomLi = ({ node, children, ...props }: CustomLiProps) => {
  return (
    <li className="py-1" {...props}>
      {children}
    </li>
  );
};
