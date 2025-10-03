import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

type ScrollAnimationProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;   // standaard "up"
  distance?: number;       // standaard 50px
  duration?: number;       // standaard 0.6s
  animation?: MotionProps; // als je zelf alles wilt overschrijven
};

export default function ScrollAnimation({
  children,
  className = "",
  direction = "up",   
  distance = 50,
  duration = 0.6,     // ✅ default duur
  animation,
}: ScrollAnimationProps) {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      default:
        return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      initial={animation?.initial || getInitial()}
      whileInView={animation?.whileInView || { opacity: 1, x: 0, y: 0 }}
      transition={
        animation?.transition || { duration, ease: "easeOut" }
      }
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
