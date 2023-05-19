import Link from "next/link"
import { useEffect, useState } from "react";
import RangeSlider from "./RangeSlider";

const RefineProportions = () => {
    const [isHidden, setIsHidden] = useState(true)

    return (
         <div className={`flex flex-row-reverse items-center md:block md:w-1/4 pointer-events-auto`}>
        <div className={`bg-beige rounded-xl p-9 shadow-xl ${isHidden ? 'hidden md:block': 'block'}`}>
            <div className="uppercase">Refine Proportions</div>
            <div className="grid grid-cols-2 gap-3 mt-7 border-t pt-7 text-sm">
                <div>ABDOMEN</div>
                <div className="text-end text-xs">SIZE HERE</div>
                <div className="col-span-2">
                <RangeSlider/>
                </div>
                <div>WAIST</div>
                <div className="text-end text-xs">SIZE HERE</div>
                <div className="col-span-2">
                    <RangeSlider/>
                </div>
                <div>HIP</div>
                <div className="text-end text-xs">SIZE HERE</div>
                <div className="col-span-2">
                    <RangeSlider/>
                </div>
                <div>BUST</div>
                <div className="text-end text-xs">SIZE HERE</div>
                <div className="col-span-2">
                    <RangeSlider/>
                </div>
            </div>
        </div>
        <div className="bg-charcoal text-beige h-fit py-3 px-1 rounded-l-lg vertical md:hidden ml-4" onClick={() =>  setIsHidden(!isHidden)}>REFINE</div>
        </div>
    )
}
export default RefineProportions