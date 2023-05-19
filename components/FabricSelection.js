import Link from "next/link"
import Image from "next/image"
import CustomSelect from "./CustomSelect"
import { useState, useEffect } from "react"
import FabricCard from "./FabricCard"
import { motion } from "framer-motion"

const FabricSelection = ({productData, productType, click, handleTrousers, handleJacket}) => {
    const test = [
        { value: null, label: 'Test 1' },
        { value: 'To Let', label: 'Test 2' },
        { value: 'For Sale', label: 'Test 3' },
    ]

    const [checkedIndex, setCheckedIndex] = useState(-1);

    const handleCardClick = (index) => {
        if (index === checkedIndex) {
            setCheckedIndex(-1);
            sessionStorage.removeItem(`selected${productType}`);
        } else {
            setCheckedIndex(index);
            sessionStorage.setItem(`selected${productType}`, JSON.stringify(productData[index]));
        }
        {handleTrousers && handleTrousers(Math.floor(Math.random() * 6))}
        {handleJacket && handleJacket(Math.floor(Math.random() * 6))}
    };
    return (
        <div
        transition={{ stiffness: 20, duration: 0.6}}
        className="bg-beige rounded-b-xl md:shadow-xl">
            <div className="md:px-9 pt-4 md:pt-5">
            <div className="flex justify-between border-t border-charcoal pt-3 md:pt-0 md:border-t-0 text-sm md:text-md">
                <div className="uppercase">Outer Fabric</div>
                <Image src='/arrow-drawer.svg' width={25} height={25} className='rotate-180'/>
            </div>
            <div className="hidden justify-between space-x-4 md:flex">
            <CustomSelect opt={test} ph='MATERIAL'/>
            <CustomSelect opt={test} ph='COLOUR'/>
            <CustomSelect opt={test} ph='PRICE'/>
            </div>
            <div className="mt-7 md:border-t  border-charcoal/25 pb-5 md:py-5 text-xs h-[30vh] md:h-[20vh] overflow-y-scroll pr-4 grid grid-cols-3 gap-2">
                {productData.map((product, index) => (
                        <FabricCard
                        key={index}
                        img={product.img}
                        price={product.price}
                        title={product.title}
                        isChecked={index === checkedIndex}
                        onCheck={() => handleCardClick(index)}
                        delay={index}
                        />
                    ))}
                
            </div>
            </div>
            <button className="border-t border-charcoal p-3 md:px-9 text-center text-sm w-full flex items-center justify-between hover:opacity-50"><span>INNER LINNING</span><Image src='/arrow-drawer.svg' width={25} height={25}/></button>
            <button className="border-y md:border-b-0 border-charcoal p-3 md:px-9 text-center text-sm w-full flex items-center justify-between hover:opacity-50"><span>TRIMS</span><Image src='/arrow-drawer.svg' width={25} height={25}/></button>
            <div className="hidden md:block"><div onClick={click}><button className="p-3 text-center text-sm w-full rounded-b-xl bg-charcoal flex items-center text-beige hover:opacity-50"><span className="w-full">DONE</span></button></div></div>
        </div>
    )
}
export default FabricSelection