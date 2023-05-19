import Link from "next/link"
import Image from "next/image"
import ButtonNoLink from "./ButtonNoLink"
import { useEffect, useState } from "react"


function getTextByNumber(number) {
    switch(number) {
        case 0:
        return "THREE PIECE SUIT";
        case 1:
        return "TWO PIECE SUIT";
        case 2:
        return "JACKET";
        case 3:
        return "TROUSERS";
        default:
        return "Invalid number provided";
    }
}


const ChosenProduct = ({handleClick, pose, screenshotClick}) => {
    const [chosenSet, setChosenSet] = useState()
    const [chosenJacket, setChosenJacket] = useState(null)
    const [chosenTrousers, setChosenTrousers] = useState(null)
    const [chosenWaistcoat, setChosenWaistcoat] = useState(null)
    const [price, setPrice] = useState()

    useEffect(() => {
        const set = sessionStorage.getItem('chosenSet');
        const jacket = JSON.parse(sessionStorage.getItem('jacket'));
        const trouser = JSON.parse(sessionStorage.getItem('trousers'));
        const waistcoat = JSON.parse(sessionStorage.getItem('waistcoat'));
        if (set !== null) {
            setChosenSet(parseInt(set));
        }
        if (jacket !== null) {
            setChosenJacket(jacket);
        }
        if (trouser !== null) {
            setChosenTrousers(trouser);
        }
        if (waistcoat !== null) {
            setChosenWaistcoat(waistcoat);
        }

        const totalPrice = (jacket ? parseInt(jacket.price) : 0) +
                            (trouser ? parseInt(trouser.price) : 0) +
                            (waistcoat ? parseInt(waistcoat.price) : 0);
        setPrice(totalPrice);
    }, [])

    function handlePose() {
        pose();
    }

    return (
        <div className="bg-beige rounded-xl md:w-full md:shadow-xl mx-5 md:mx-0 pointer-events-auto">
            <div className="pt-5 md:px-9 md:pt-9">
            <div>{getTextByNumber(chosenSet)}</div>
            <div className="text-end text-sm font-bold">£{price}</div>
            <div className="mb-4 md:mb-0 mt-3 md:mt-7 border-t  border-charcoal/25 py-7 text-xs h-[30vh] md:h-[25vh] overflow-y-scroll pr-4">
                {[0,1,2].includes(chosenSet) &&
                <>
                    <div className="mb-3 uppercase">{chosenJacket.title}</div>
                    <div>{chosenJacket.description}</div>
                </>    
                }
                {[0,1,3].includes(chosenSet) &&
                <>
                    <div className="my-3 uppercase border-t pt-3">{chosenTrousers.title}</div>
                    <div>{chosenTrousers.description}</div>
                </>
                }
                {chosenWaistcoat !== null &&
                <>
                    <div className="my-3 uppercase border-t pt-3">{chosenWaistcoat.title}</div>
                    <div>{chosenWaistcoat.description}</div>
                </>
                }
            </div>
            </div>
            <button onClick={handlePose} className="mb-2 md:mb-0 border md:border-0 md:border-t border-charcoal p-2 md:p-2.5 text-center text-sm w-full flex items-center hover:opacity-50"><Image src='/change.svg' width={25} height={25}/><span className="w-full">CHANGE POSE</span></button>
            <button onClick={screenshotClick} className="mb-2 md:mb-0 border md:border-0 md:border-t border-charcoal p-2 md:p-2.5 text-center text-sm w-full flex items-center hover:opacity-50"><Image src='/camera.svg' width={25} height={25}/><span className="w-full">SAVE SNAPSHOT</span></button>
            <div onClick={handleClick}><button className="p-2 md:p-2.5 text-center text-sm w-full md:rounded-b-xl bg-charcoal flex items-center text-beige hover:opacity-50"><Image src='/fabric.svg' width={25} height={25}/><span className="w-full">CHOOSE FABRIC</span></button></div>
        </div>
    )
}
export default ChosenProduct