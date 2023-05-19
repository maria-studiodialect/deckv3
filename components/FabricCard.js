import Link from "next/link"
import Image from "next/image"
import { useState } from "react";
import { motion } from "framer-motion";
const FabricCard = ({ img, title, price, isChecked, onCheck, delay}) => {

    return (
        <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{duration: 0.2, delay:`0.${delay}`}}
        onClick={onCheck} className={`border p-1 ${isChecked ? 'border-black bg-charcoal/10' : 'border-transparent'}`}>
            <div className="relative">
            <div className="relative rounded-xl h-16 w-full">
                <Image src={img} fill className="object-cover bg-transparent" alt={`${title} image`}/>
            </div>
            </div>
            <div className="uppercase text-xs  md:text-xxs mt-2 md:mt-2">{title}</div>
            {price &&
            <div className="uppercase text-xs md:text-xxs mt-2 md:mt-2">£{price}</div>
            }
        </motion.div>
    )
}
export default FabricCard