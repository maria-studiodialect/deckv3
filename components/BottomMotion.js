import { motion } from "framer-motion";

const BottomMotion = ({ children, width }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ stiffness: 50, duration: 0.8 }}
        className={width}
    >
        {children}
    </motion.div>
)

export default BottomMotion
