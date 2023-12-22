import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

type Breakpoints = {
  [key in Breakpoint]: number;
};

const breakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function getBreakpoint(): Breakpoint {
  const { innerWidth } = window;
  switch (true) {
    case innerWidth >= breakpoints["2xl"]:
      return "2xl";
    case innerWidth >= breakpoints.xl:
      return "xl";
    case innerWidth >= breakpoints.lg:
      return "lg";
    case innerWidth >= breakpoints.md:
      return "md";
    default:
      return "sm";
  }
}

function useResponsiveDesign() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint());

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

export { useResponsiveDesign, type Breakpoint, type Breakpoints };
