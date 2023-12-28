import { Image } from "@nextui-org/react";
import phoneUrl from "@/assets/phone.png";
import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const vars = {
  className:
    "h-[24rem] w-[12rem] \
    sm:h-[28rem] sm:w-[14rem] \
    md:h-[32rem] md:w-[16rem] \
    lg:h-[36rem] lg:w-[18rem] \
    xl:h-[40rem] xl:w-[20rem] \
    2xl:h-[44rem] 2xl:w-[22rem] \
    my-[6rem] sm:my-[7rem] md:my-[8rem] lg:my-[9rem] xl:my-[10rem] 2xl:my-[11rem]",
  scrollInput: [0, 0.25, 1],
  scaleOutput: [1, 1, 1.5],
};

export function PhoneImage({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const [scope, animate] = useAnimate();
  const scroll = useScroll({
    target: scope,
    container: containerRef,
    offset: ["start end", "end end"],
    layoutEffect: false,
  });
  const scale = useTransform(
    scroll.scrollYProgress,
    vars.scrollInput,
    vars.scaleOutput,
  );

  useMotionValueEvent(scale, "change", (scale) => {
    animate(
      scope.current,
      {
        scale,
      },
      {
        bounce: 0,
      },
    );
  });

  return (
    <motion.div
      initial={{
        scale: 1,
      }}
      ref={scope}
      className={vars.className}
    >
      <Image isBlurred src={phoneUrl} />
    </motion.div>
  );
}
