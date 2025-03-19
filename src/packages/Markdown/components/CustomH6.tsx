import type { PropsWithChildren } from 'react';

interface CustomH6Props extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}

export const CustomH6 = ({ node, children, ...props }: CustomH6Props) => {
  return (
    <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
      {children}
    </h6>
  );
};
