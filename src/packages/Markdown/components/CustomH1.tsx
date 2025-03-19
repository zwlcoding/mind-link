import type { PropsWithChildren } from 'react';

interface CustomH1Props extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}

export const CustomH1 = ({ node, children, ...props }: CustomH1Props) => {
  return (
    <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h1>
  );
};
