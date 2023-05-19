import Link from "next/link"
import { motion } from "framer-motion"


const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0
    }, 
    visible: {
        opacity: 1, 
        pathLength: 1, 
        transition: {
            duration: 2, 
            ease: 'easeInOut'
        }
    }
}

const Loader = ({text, progress}) => {
    return (
        <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="h-screen w-screen fixed top-0 left-0 overflow-x-hidden flex flex-col items-center justify-center text-center bg-beige z-20">
            <div className="font-editorial text-4xl mb-5">{text}</div>
            <motion.svg width="188" height="42" viewBox="0 0 188 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1
                    }}
                    d="M0 33.7136C22.5 33.7136 47.1027 11.0849 29.9997 2.02554C14.5 -6.18453 2.34371 37.7182 38.9891 33.7136C63.5 31.035 89 -5.63724 105.633 20.0762C134.695 65.0058 179.078 25.2848 187 14.1099" stroke="#2F2727"/>
            </motion.svg>
            {progress !== false && <div className="text-xs">{progress}%</div>}
        </motion.div>
    )
}
export default Loader