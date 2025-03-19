import type { PropsWithChildren } from 'react';

interface CustomHrProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}

export const CustomHr = ({ node, ...props }: CustomHrProps) => {
  return <hr className="my-6 border-t border-gray-300" {...props} />;
};
