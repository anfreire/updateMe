import { useEffect, useState } from "react";
import NotFoundSVG from "./components/logo";

const text = "Page Not Found";

export default function NotFound() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    var interval: NodeJS.Timeout | undefined = undefined;
    interval = setInterval(() => {
      if (textIndex === text.length) {
        clearInterval(interval);
        return;
      }
      setTextIndex((prev) => (prev < text.length ? prev + 1 : prev));
    }, 100);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full">
      <div className="flex h-1/2 w-full flex-col items-center justify-end">
        <NotFoundSVG />
      </div>
      <div className="mt-10 flex h-1/2 w-full flex-col items-center justify-start">
        <h1 className="text-center font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-red-600">
          {text.substring(0, textIndex)}
        </h1>
      </div>
    </div>
  );
}
