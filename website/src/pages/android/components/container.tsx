import React from "react";

type ContainerSize = "full" | "1/3" | "1/2" | "2/3";

const converter: Record<ContainerSize, string> = {
  full: "h-screen-no-navbar min-h-screen-no-navbar",
  "1/3": "h-1/3-no-navbar min-h-1/3-no-navbar",
  "1/2": "h-1/2-no-navbar min-h-1/2-no-navbar",
  "2/3": "h-2/3-no-navbar min-h-2/3-no-navbar",
};

export interface ContainerProps {
  size: ContainerSize;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
const Container = React.forwardRef(
  (
    { size, children, className, style }: ContainerProps,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      className={`${converter[size]} w-full ${className}`}
      style={style}
    >
      {children}
    </div>
  ),
);

export default Container;
