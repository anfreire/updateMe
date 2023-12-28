import { Transition, Variants, motion } from "framer-motion";
import { useTheme } from "next-themes";
const variants: (colorScheme: "light" | "dark") => Variants = (colorScheme) => {
  return {
    hidden: {
      pathLength: 0,
      opacity: 0,
      fill: "rgba(255, 255, 255, 0)",
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      fill: colorScheme === "light" ? "#000" : "#fff",
    },
  };
};

const duration: number = 1.5;

const transition: Transition = {
  ease: "linear",
  duration: duration,
  fill: { delay: duration, duration: 1, ease: "easeIn" },
};

const NotFoundSVG = () => {
  const colorScheme = useTheme().theme === "light" ? "light" : "dark";
  return (
    <motion.svg
      initial="hidden"
      animate="animate"
      className="xl:h-128 xl:w-128 h-52 w-52 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-96 lg:w-96"
      xmlSpace="preserve"
      viewBox="0 0 295.996 295.996"
    >
      <motion.polygon
        variants={variants(colorScheme)}
        transition={transition}
        className="stroke-current"
        points="109.433,118.698 127.373,100.76 116.061,89.445 97.988,107.517 79.916,89.445 68.604,100.76 86.544,118.698 68.603,136.639 79.917,147.953 97.988,129.881 116.06,147.953 127.374,136.639 "
        id="polygon1"
      />
      <motion.polygon
        variants={variants(colorScheme)}
        transition={transition}
        className="stroke-current"
        points="209.433,118.698 227.373,100.76 216.061,89.445 197.988,107.517 179.916,89.445 168.604,100.76 186.544,118.698 168.603,136.639 179.917,147.953 197.988,129.881 216.06,147.953 227.374,136.639 "
        id="polygon2"
      />
      <motion.path
        variants={variants(colorScheme)}
        transition={{ ...transition, duration: duration + 0.5 }}
        className="stroke-current"
        d="m 227.664,189.997 h -160 v 16 h 94 v 12 c 0,16.708 12.651,30.546 28.779,32.699 1.436,0.192 2.983,0.301 4.471,0.301 15.493,0 28.395,-10.734 31.925,-25.155 0.616,-2.517 0.825,-5.142 0.825,-7.845 z m -50,16 h 34 v 12 c 0,9.374 -7.626,17 -17,17 -9.374,0 -17,-7.626 -17,-17 z"
        id="path2"
      />
    </motion.svg>
  );
};
export default NotFoundSVG;
