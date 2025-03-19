import type { ImgHTMLAttributes } from 'react';

interface CustomImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  node?: any;
}

export const CustomImg = ({ node, alt, ...props }: CustomImgProps) => {
  return (
    <div className="my-4 flex justify-center">
      <img
        className="max-w-full rounded-md shadow-sm"
        alt={alt || '图片'}
        loading="lazy"
        {...props}
      />
    </div>
  );
};
