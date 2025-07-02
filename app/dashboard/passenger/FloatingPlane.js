import { motion } from "framer-motion";

const FloatingPlane = () => {
  return (
    <motion.div
      className="passenger-floating-plane"
      animate={{ x: ["-5%", "105%"], rotate: [0, 10, 0] }}
      transition={{
        duration: 12,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
    >
      ✈
    </motion.div>
  );
};

export default FloatingPlane;
