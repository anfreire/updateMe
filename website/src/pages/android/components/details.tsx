import { useRef } from "react";
import { AppData, appsData } from "../data";
import { motion, useInView } from "framer-motion";
interface DetailProps {
  app: AppData;
}

function Detail({ app }: DetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);

  return (
    <motion.div
      ref={containerRef}
      variants={{
        hidden: {
          opacity: 0,
          transition: {
            ease: "easeOut",
            duration: 0.5,
          },
        },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.5,
            ease: "easeIn",
            duration: 1,
          },
        },
      }}
      animate={inView ? "visible" : "hidden"}
      initial="hidden"
      className="mx-4 my-20 flex flex-col items-center justify-center gap-6 rounded-md p-4 text-center sm:mx-8 sm:gap-7 md:mx-16 md:gap-8 lg:mx-56 lg:gap-9 xl:mx-72 xl:gap-10 2xl:mx-96 2xl:gap-11"
    >
      <div className="flex size-36 flex-col items-center justify-center sm:size-52 md:size-64 lg:size-80 xl:size-96 2xl:size-[24rem]">
        {app.icon}
      </div>
      <motion.h1 className="mb-4 text-4xl font-bold md:text-5xl xl:text-6xl 2xl:text-7xl">
        {app.title}
      </motion.h1>
      <motion.p
        style={{ textAlignLast: "center" }}
        className="mb-4 flex justify-center text-justify text-lg font-medium md:px-10 md:text-xl lg:px-20 xl:px-32 xl:text-2xl 2xl:text-3xl"
      >
        {app.description}
      </motion.p>
    </motion.div>
  );
}

export default function Details() {
  return (
    <div className="my-20 flex w-full flex-col justify-center gap-20 md:my-32 md:gap-32 lg:my-52 lg:gap-52 xl:my-64 xl:gap-64 2xl:my-96 2xl:gap-96">
      {appsData.map((app, index) => (
        <Detail app={app} key={index} />
      ))}
    </div>
  );
}
