import { AnimatePresence, Transition, motion } from "framer-motion";
import { useEffect, useState } from "react";

const titles: Record<
  number,
  {
    title: string;
    className: string;
  }
> = {
  0: {
    title: "One App",
    className: "text-7xl sm:text-8xl md:text-9xl",
  },
  1: {
    title: "Prime Collection",
    className: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
  },
  3: {
    title: "Unified Hub",
    className: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
  },
  2: {
    title: "Bleeding-Edge Releases",
    className: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl",
  },
};

const transition: Transition = {
  duration: 1,
  ease: "backOut",
};

const variants = {
  initial: {
    opacity: 0,
    y: 400,
    transition,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition,
  },
  exit: {
    opacity: 0,
    y: -400,
    transition,
  },
};

export default function Title() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % Object.keys(titles).length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence initial={false}>
      {Object.keys(titles).map((key) => {
        const indexKey = Number(key);
        return indexKey === index ? (
          <motion.h1
            key={indexKey}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            className={
              titles[indexKey].className +
              "w-full my-3 text-wrap text-center font-thin"
            }
          >
            {titles[indexKey].title}
          </motion.h1>
        ) : null;
      })}
    </AnimatePresence>
  );
}
