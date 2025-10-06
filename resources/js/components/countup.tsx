import { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface CountUpProps {
  end?: number;
  duration?: number;
  className?: string;
  children?: ReactNode; // optioneel
}

export default function CountUp({ end = 100, duration = 2, className = "", children }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const totalFrames = Math.round(duration * 60);
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
      className={`text-5xl font-bold text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {count} {children}
    </motion.div>
  );
}


