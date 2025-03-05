import type { PropsWithChildren } from 'react';


interface CustomH2Props extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}


export const CustomH2 = ({ node, children, ...props }: CustomH2Props) => {
  return <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>{children}</h2>;
};
