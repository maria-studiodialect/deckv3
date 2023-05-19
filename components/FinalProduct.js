import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const FinalProduct = () => {
    const [chosenSet, setChosenSet] = useState()
    const [chosenJacket, setChosenJacket] = useState(null)
    const [chosenTrousers, setChosenTrousers] = useState(null)
    const [chosenWaistcoat, setChosenWaistcoat] = useState(null)
    const [price, setPrice] = useState()
    const [jacketFabric, setJacketFabric] = useState(null);
    const [trouserFabric, setTrouserFabric] = useState(null);
    const [waistcoatFabric, setWaistcoatFabric] = useState(null);
    const [isHidden, setIsHidden] = useState(false)


    useEffect(() => {
        const set = sessionStorage.getItem('chosenSet');
        const jacket = JSON.parse(sessionStorage.getItem('jacket'));
        const trouser = JSON.parse(sessionStorage.getItem('trousers'));
        const waistcoat = JSON.parse(sessionStorage.getItem('waistcoat'));
        const storedJacketFabric = JSON.parse(sessionStorage.getItem('selectedJacketFabric'));
        const storedTrouserFabric = JSON.parse(sessionStorage.getItem('selectedTrouserFabric'));
        const storedWaistcoatFabric = JSON.parse(sessionStorage.getItem('selectedWaistcoatFabric'));



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
        if (storedJacketFabric !== null) {
            setJacketFabric(storedJacketFabric);
        }
        if (storedTrouserFabric !== null) {
            setTrouserFabric(storedTrouserFabric);
        }

        if (storedWaistcoatFabric !== null) {
            setWaistcoatFabric(storedWaistcoatFabric);
        }


        const totalPrice = (jacket ? parseInt(jacket.price) : 0) +
                            (trouser ? parseInt(trouser.price) : 0) +
                            (waistcoat ? parseInt(waistcoat.price) : 0) +
                            (storedJacketFabric ? parseInt(storedJacketFabric.price) : 0) +
                            (storedWaistcoatFabric ? parseInt(storedWaistcoatFabric.price) : 0) +
                            (storedTrouserFabric ? parseInt(storedTrouserFabric.price) : 0);

        setPrice(totalPrice);
    }, [])


    console.log(chosenWaistcoat)
    return (
        <motion.div 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5}}
        className="md:flex items-center mx-5 md:mx-0">
        <div className={`bg-beige rounded-xl md:w-1/4 md:shadow-xl transition-all pointer-events-auto ${isHidden ? 'ml-[-27%]': ''}`}>
            <div className="pt-5 md:px-9 md:pt-9">
            <div>{getTextByNumber(chosenSet)}</div>
            <div className="text-end text-sm font-bold">£{price}</div>
            <div className="mt-3 md:mt-7 border-t mb-20 md:mb-0 border-charcoal/25 py-7 text-xs md:h-[40vh] md:overflow-y-scroll pr-4">
                {[0,1,2].includes(chosenSet) &&
                <>
                    <div className="mb-3 uppercase">{chosenJacket.title}</div>
                    <div>{chosenJacket.description}</div>
                    <div className="ml-3 my-3 uppercase">+ {jacketFabric.title}</div>
                    <div className="ml-5">{jacketFabric.description}</div>
                </>    
                }
                {[0,1,3].includes(chosenSet) &&
                <>
                    <div className="my-3 uppercase border-t pt-3">{chosenTrousers.title}</div>
                    <div>{chosenTrousers.description}</div>
                    <div className="ml-3 my-3 uppercase">+ {trouserFabric.title}</div>
                    <div className="ml-5">{trouserFabric.description}</div>
                </>
                }
                {chosenWaistcoat !== null &&
                <>
                    <div className="my-3 uppercase border-t pt-3">{chosenWaistcoat.title}</div>
                    <div>{chosenWaistcoat.description}</div>
                    <div className="ml-3 my-3 uppercase">+ {waistcoatFabric.title}</div>
                    <div className="ml-5">{waistcoatFabric.description}</div>
                </>
                }
            </div>
            </div>
        </div>
        <div className="bg-charcoal h-fit px-1.5 py-8 rounded-r-lg hidden md:block pointer-events-auto" onClick={() =>  setIsHidden(!isHidden)}>
            <div className={isHidden ? "rotate-90" : "-rotate-90"}>
                <svg width="24" height="12" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M1 15C1 15 16 12.5543 16 2.10592e-06" stroke="#F7F4EE" stroke-miterlimit="10"/>
                <path d="M31 15C31 15 16 12.5543 16 1.38905e-07" stroke="#F7F4EE" stroke-miterlimit="10"/>
                </svg>
            </div>
        </div>
         </motion.div>

    )
}
export default FinalProduct