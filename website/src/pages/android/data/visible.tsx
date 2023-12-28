import { motion } from "framer-motion";
const VisibleSVG = () => (
  <motion.svg viewBox="-0.5 0 25 25">
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
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.595 11.38c-4.74-4.78-12.45-4.78-17.19 0l-.76.76c-.2.2-.2.52 0 .72l.76.76c4.74 4.78 12.45 4.78 17.19 0l.76-.76c.2-.2.2-.52 0-.72l-.76-.76Z"
    />
    <motion.path
      fill="none"
      variants={{
        hidden: {
          pathLength: 0,
        },
        visible: {
          pathLength: 1.1,
          transition: {
            duration: 1,
            ease: "linear",
          },
        },
      }}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      className="stroke-current stroke-[0.2px] md:stroke-[0.1px]"
      d="M12.005 15.06a2.56 2.56 0 1 0 0-5.12 2.56 2.56 0 0 0 0 5.12Z"
    />
  </motion.svg>
);
export default VisibleSVG;
