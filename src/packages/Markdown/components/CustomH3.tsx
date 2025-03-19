import type { PropsWithChildren } from 'react';

interface CustomH3Props extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}

export const CustomH3 = ({ node, children, ...props }: CustomH3Props) => {
  return (
    <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h3>
  );
};
