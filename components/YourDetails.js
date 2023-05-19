import Link from "next/link"
import { useEffect, useState } from 'react'

const YourDetails = ({text, mainColour, href, icon, onPrevStep}) => {
    const [isHidden, setIsHidden] = useState(false)
    const [formData, setFormData] = useState(null)
    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('formData') || '{}');
        setFormData(storedData)
    }, []) // <-- removed formData from dependency array
    return (
        <div className={`flex items-center md:block md:w-full mx-5 md:mx-0 pointer-events-auto`}>
        <div className={`bg-beige rounded-xl pt-5 md:p-9 md:shadow-xl ${isHidden ? 'hidden md:block': 'block'}`}>
            <div className="md:text-sm">YOUR DETAILS</div>
            <div className="mt-3 text-sm md:text-xs">Lorem ipsum dolor sit amet dictum consectetur adipiscing elit. Etiameu turpis molestie.</div>
            {formData &&
            <div className="grid grid-cols-2 gap-3 mt-5 md:mt-7 border-y py-5 md:py-7 text-sm md:text-xs">
                <div>NAME</div>
                <div className="text-end">{formData.name}</div>
                <div>AGE</div>
                <div className="text-end uppercase">{formData.age} yrs</div>
                <div>HEIGHT</div>
                <div className="text-end uppercase">{formData.height} {formData.heightUnit}</div>
                <div>WEIGHT</div>
                <div className="text-end uppercase">{formData.weight} {formData.weightUnit}</div>
                <div>SKIN TONE</div>
                <div className="rounded-full w-5 h-5 justify-self-end" style={{backgroundColor: formData.skinTone}}></div>
            </div>
            }
            <div onClick={onPrevStep}><button className="my-4 mb-2 md:mb-0 border border-charcoal md:hover:bg-charcoal md:hover:text-beige p-2 text-center text-sm w-full uppercase">Edit Details</button></div>
            <button className="md:hidden my-2 md:mb-0 border border-charcoal bg-charcoal text-beige p-2 text-center text-sm w-full uppercase">Refine Proportions</button>
        </div>
        {/*<div className="bg-charcoal text-beige h-fit py-3 px-1 rounded-r-lg vertical md:hidden mr-4" onClick={() =>  setIsHidden(!isHidden)}>DETAILS</div>*/}
        </div>
    )
}
export default YourDetails
