import { motion } from "framer-motion";

const UnlockSVG = () => (
  <motion.svg viewBox="0 0 32 32">
    <motion.path
      fill="none"
      variants={{
        hidden: {
          pathLength: 0,
        },
        visible: {
          pathLength: 1.1,
          transition: {
            duration: 1.5,
            ease: "linear",
          },
        },
      }}
      className="stroke-current stroke-[0.2px] md:stroke-[0.1px]"
      d="M 22.93,11.203 V 9.07 C 22.93,5.243 19.827,2.139 16,2.139 12.172,2.139 9.068,5.242 9.068,9.07 v 6.398"
    />
    <motion.path
      fill="none"
      variants={{
        hidden: {
          pathLength: 0,
        },
        visible: {
          pathLength: 1,
          transition: {
            duration: 1,
            ease: "linear",
          },
        },
      }}
      className="stroke-current stroke-[0.2px] md:stroke-[0.1px]"
      d="M 9.068,15.468 H 5.336 V 29.862 H 26.661 V 15.468 h -3.199 l 0.002,-10e-4 H 10.136 Z"
    />
  </motion.svg>
);
export default UnlockSVG;
