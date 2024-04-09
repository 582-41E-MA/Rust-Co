import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <motion.div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "25px",
        border: "5px solid #eee",
        borderTop: "5px solid #423333",
        display: "inline-block",
      }}
      animate={{ rotate: 360 }}
      transition={spinTransition}
    />
  );
};

export default Loader;