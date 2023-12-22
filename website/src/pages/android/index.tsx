import { useRef } from "react";
import { Image0, Image1 } from "./components/images";

export default function Android() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden"
    >
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[calc(100dvh-100px)] w-full flex-col items-center justify-center gap-2">
          <h1 className="text-center text-8xl font-light">ONE</h1>
          <h1 className="text-center text-8xl font-light">APP</h1>
        </div>
        <Image0 containerRef={containerRef} />
        <div className="flex h-[calc(100dvh-100px)] w-full flex-col items-center justify-center gap-2">
          <h1 className="text-center text-7xl animate-pulse">ALL</h1>
          <h1 className="text-center text-7xl animate-pulse">UPDATES</h1>
        </div>
      </div>

      <div className=" my-[100dvh]"></div>
      <Image1 containerRef={containerRef} />
      <div className=" my-[100dvh]"></div>
    </div>
  );
}
