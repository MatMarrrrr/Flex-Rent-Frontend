import { Variants } from "framer-motion";

const createFromBottomVariants = (delayFactor: number): Variants => ({
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * delayFactor },
  }),
});

const createFromRightVariants = (delayFactor: number): Variants => ({
  hidden: { opacity: 0, x: 50 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * delayFactor },
  }),
});

export const fromBottomVariants03 = createFromBottomVariants(0.3);
export const fromBottomVariants01 = createFromBottomVariants(0.1);
export const fromRightVariants = createFromRightVariants(0.1);
