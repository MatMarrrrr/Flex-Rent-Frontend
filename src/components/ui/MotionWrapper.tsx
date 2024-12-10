import React from "react";
import { motion, Variants } from "framer-motion";

interface MotionWrapperProps {
  children: React.ReactNode;
  variants: Variants;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variants,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
};

export default MotionWrapper;
