import React from "react";
import { motion } from "framer-motion";
import "./MotionBackdrop.css"
const MotionBackdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="motionbackdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionBackdrop;
