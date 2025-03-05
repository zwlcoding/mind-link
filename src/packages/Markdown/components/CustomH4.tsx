import type { PropsWithChildren } from 'react';


interface CustomH4Props extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}


export const CustomH4 = ({ node, children, ...props }: CustomH4Props) => {
  return <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>{children}</h4>;
};
