import type { PropsWithChildren } from 'react';


interface CustomBlockquoteProps extends PropsWithChildren {
  node?: any;
  inline?: boolean;
  className?: string;
}


export const CustomBlockquote = ({ node, children, ...props }: CustomBlockquoteProps) => {
  return (
    <blockquote
      className="pl-4 border-l-4 border-gray-300 italic text-gray-700 my-4"
      {...props}
    >
      {children}
    </blockquote>
  );
};
