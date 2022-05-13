import { motion } from "framer-motion";

export default function Backdrop({ children }: any) {
  return (
    <motion.div
      className="fixed z-10 top-0 left-0 w-full h-screen bg-black bg-opacity-70 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
