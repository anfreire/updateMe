import { motion } from "framer-motion";

const UpdatedSVG = () => (
  <motion.svg viewBox="0 0 24 24">
    <motion.path
      fill="none"
      variants={{
        hidden: {
          pathLength: 0,
        },
        visible: {
          pathLength: 1,
          transition: {
            duration: 1.5,
            ease: "linear",
          },
        },
      }}
      className="stroke-current stroke-[0.2px] md:stroke-[0.1px]"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.472 16.702a8 8 0 1 1 1.512-4.2m0 0 1.5-1.5m-1.5 1.5-1.5-1.5"
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
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3"
    />
  </motion.svg>
);

export default UpdatedSVG;
