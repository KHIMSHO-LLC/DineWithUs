import * as React from "react";
import { cn } from "./utils";
import Image from "next/image";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Avatar({
  className,
  children,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

function AvatarImage({
  className,
  src,
  alt,
  ...props
}: AvatarImageProps) {
  const { width, height, ...restProps } = props;
  const [imageError, setImageError] = React.useState(false);
  
  // Don't render if no src or if image failed to load
  if (!src || src.trim() === '' || imageError) {
    return null;
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      className={cn("aspect-square size-full object-cover", className)}
      onError={() => setImageError(true)}
      {...restProps} // Pass any other remaining props
      fill // Use the fill prop to make the image fill its parent
    />
  );
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function AvatarFallback({
  className,
  children,
  ...props
}: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full text-sm font-medium leading-normal",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
