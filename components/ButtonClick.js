import Link from "next/link"

const ButtonClick = ({text, mainColour, click, icon}) => {
    return (

            <div onClick={click} className={`${mainColour} px-3 py-2 xxl:px-8 xxl:py-6 flex items-center font-editorial text-2xl cursor-pointer`}>
                {text} 
                <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3 w-7 stroke-beige md:stroke-charcoal">
                    <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M50 18.5L0 18.5" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
    )
}
export default ButtonClick