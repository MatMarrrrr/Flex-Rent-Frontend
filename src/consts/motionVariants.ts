import { Variants } from "framer-motion";

export const fromBottomVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.3 },
  }),
};

export const fromRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.1 },
  }),
};
