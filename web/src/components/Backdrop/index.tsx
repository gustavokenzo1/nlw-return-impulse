import { motion } from "framer-motion"

export default function Backdrop({ children }: any) {
  return (
    <motion.div
      className="fixed z-1 top-0 left-0 w-full h-screen bg-black opacity-70 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      { children }
    </motion.div>
  )
}