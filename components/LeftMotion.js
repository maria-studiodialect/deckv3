import { motion } from "framer-motion";

const LeftMotion = ({ children, width }) => (
    <motion.div
        initial={{ x: -100, opacity: 1 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ stiffness: 20, duration: 0.6}}
        className={width}
    >
        {children}
    </motion.div>
)

export default LeftMotion
