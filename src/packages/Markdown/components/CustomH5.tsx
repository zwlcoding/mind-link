import type { PropsWithChildren } from 'react';

interface CustomH5Props extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}

export const CustomH5 = ({ node, children, ...props }: CustomH5Props) => {
  return (
    <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
      {children}
    </h5>
  );
};
