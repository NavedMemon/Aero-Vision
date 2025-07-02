import { motion } from "framer-motion";
import "./passenger.css";

const NeonWidget = ({ title, children }) => {
  return (
    <motion.div
      className="passenger-widget"
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px #00f2ff" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3>{title}</h3>
      <div className="passenger-widget-content">{children}</div>
    </motion.div>
  );
};

export default NeonWidget;
