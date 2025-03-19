import type { PropsWithChildren } from 'react';

interface CustomPProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}

export const CustomP = ({ node, children, ...props }: CustomPProps) => {
  return (
    <p className="my-2 text-base leading-relaxed" {...props}>
      {children}
    </p>
  );
};
