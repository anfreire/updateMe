import { Image } from "@nextui-org/react";
import img0Url from "../../../../assets/0.png";
import img1Url from "../../../../assets/1.png";
import {
  motion,
  useAnimate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const img0Size =
  "h-[24rem] w-[12rem] \
sm:h-[28rem] sm:w-[14rem] \
md:h-[32rem] md:w-[16rem] \
lg:h-[36rem] lg:w-[18rem] \
xl:h-[40rem] xl:w-[20rem] \
2xl:h-[44rem] 2xl:w-[22rem]";

const yInput = [0, 0.25, 1];
const scaleOutput = [1, 1, 1.5];

export function Image0({
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
  const scale = useTransform(scroll.scrollYProgress, yInput, scaleOutput);

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
      className={img0Size}
    >
      <Image isBlurred src={img0Url} />
    </motion.div>
  );
}

const xInput = [0, 0.25, 0.75, 1];
const posOutput = [300, 0, 0, 300];

export function Image1({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const [scope, animate] = useAnimate();
  const scroll = useScroll({
    target: scope,
    container: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  const pos = useTransform(scroll.scrollYProgress, xInput, posOutput);

  useMotionValueEvent(pos, "change", (pos) => {
    console.log(pos);
    animate(
      scope.current,
      {
        x: pos,
      },
      {
        bounce: 0,
      },
    );
  });

  return (
    <motion.div ref={scope} className="flex w-full justify-end">
      <Image
        style={{
          aspectRatio: 0.892703863,
        }}
        className="h-[24rem] rounded-none sm:h-[28rem] md:h-[32rem] lg:h-[36rem] xl:h-[40rem] 2xl:h-[44rem]"
        src={img1Url}
      />
    </motion.div>
  );
}
