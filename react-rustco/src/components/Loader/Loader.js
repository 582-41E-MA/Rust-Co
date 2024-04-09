import React from 'react';
import { useEffect } from "react";
import { motion, useAnimate } from 'framer-motion';
import "./Loader.css";

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

// export default function Loader() {
//     const [scope, animate] = useAnimate();
  
//     useEffect(() => {
//       const containerWidth = document.querySelector(".container").offsetWidth;
//       const animateLoader = async () => {
//         await animate(
//           [
//             [scope.current, { x: 0, width: "100%" }],
//             [scope.current, { x: containerWidth, width: "0%" }, { delay: 0.6 }]
//           ],
//           {
//             duration: 2,
//             repeat: Infinity,
//             repeatDelay: 0.8
//           }
//         );
//       };
//       animateLoader();
//     }, []);
  
//     return (
//       <div className="container">
//         <motion.div ref={scope} className="loader" />
//         <h1 className="text text-lg">
//           Loading ...
//         </h1>
//       </div>
//     );
//   }