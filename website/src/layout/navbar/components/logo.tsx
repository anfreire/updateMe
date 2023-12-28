import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const letters = ["U", "p", "d", "a", "t", "e", "\u00A0", "M", "e"];

export default function NavBarLogo() {
  return (
    <Link to="/">
      <motion.div
        variants={{
          initial: {},
          animate: {},
        }}
        initial="initial"
        animate="animate"
        className="flex h-16 flex-row items-center justify-center gap-1 overflow-y-hidden sm:-translate-x-2 sm:gap-2"
      >
        <motion.svg
          className="h-6 w-6 sm:h-8 sm:w-8"
          viewBox="-1.5 0 12.16 12.16"
        >
          <motion.path
            variants={{
              initial: {
                rotate: 0,
                opacity: 0,
              },
              animate: {
                rotate: 360,
                opacity: 1,
                transition: {
                  duration: 3,
                  type: "spring",
                  bounce: 0.3,
                },
              },
            }}
            className="fill-current"
            d="M3.25 2.464v2.124a.647.655 0 0 1-1.293 0v-.617a3.391 3.434 0 0 0-.648 1.444.647.655 0 1 1-1.268-.252 4.685 4.745 0 0 1 .934-2.046h-.47a.647.655 0 1 1 0-1.308h2.097a.647.655 0 0 1 .647.655ZM1.207 8.337a.645.654 0 0 1-.852-.333 4.707 4.767 0 0 1-.233-.658.647.655 0 1 1 1.246-.35 3.437 3.48 0 0 0 .168.477.646.654 0 0 1-.329.864Zm1.824 1.55a.645.654 0 0 1-.891.205 4.723 4.783 0 0 1-.556-.414.647.655 0 0 1 .842-.994 3.413 3.456 0 0 0 .403.3.647.655 0 0 1 .202.904Zm2.311.28a.647.655 0 0 1-.637.663H4.64a4.702 4.761 0 0 1-.51-.028.647.655 0 0 1 .141-1.3 3.397 3.44 0 0 0 .417.019h.009a.647.655 0 0 1 .647.645zm.021-8.17a.647.655 0 0 1-.646.643h-.02a.647.655 0 0 1 .01-1.31h.023a.647.655 0 0 1 .633.668zm2.032 7.154a.646.654 0 0 1-.188.906 4.695 4.754 0 0 1-.5.288.647.655 0 1 1-.569-1.176 3.44 3.484 0 0 0 .363-.208.647.655 0 0 1 .894.19ZM6.15 2.223a.646.654 0 0 1 .885-.228l.011.007a.647.655 0 1 1-.665 1.122l-.007-.004a.646.654 0 0 1-.224-.897ZM8.823 8.23a4.71 4.769 0 0 1-.197.356.647.655 0 1 1-1.099-.69 3.146 3.186 0 0 0 .144-.258.647.655 0 1 1 1.152.591ZM7.593 4.38a.647.655 0 0 1 1.124-.646l.005.008a.647.655 0 1 1-1.124.647zM9.33 5.962a5.856 5.93 0 0 1 0 .233.647.655 0 0 1-.646.639h-.016a.647.655 0 0 1-.63-.671 2.904 2.94 0 0 0 0-.17.647.655 0 0 1 .63-.67h.016a.647.655 0 0 1 .646.638z"
          />
        </motion.svg>
        <motion.h1
          className="font-sans text-2xl font-medium sm:text-3xl"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                  transition: {
                    duration: 1.5,
                    ease: "circOut",
                  },
                },
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </Link>
  );
}
