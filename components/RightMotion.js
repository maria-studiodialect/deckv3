import { motion } from "framer-motion";

const RightMotion = ({ children, width }) => (
    <motion.div
        initial={{ x: 100, opacity: 1 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={width}
    >
        {children}
    </motion.div>
)

export default RightMotion
