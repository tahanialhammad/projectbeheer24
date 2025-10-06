import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CountUp({ end = 100, duration = 2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const totalFrames = Math.round(duration * 60); // ~60 FPS
    const increment = end / totalFrames;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      start += increment;
      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [end, duration]);

  return (
    <motion.div
      className="text-5xl font-bold text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {count}
    </motion.div>
  );
}

export default CountUp;
