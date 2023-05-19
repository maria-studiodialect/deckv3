import Head from 'next/head'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Link from 'next/link'
import FabricSelection from '@/components/FabricSelection'
import { useEffect, useState, useRef } from 'react'
import Sheet, { SheetRef } from 'react-modal-sheet';
import RightMotion from '../RightMotion'
import { AnimatePresence } from 'framer-motion'

const FabricPage = ({onNextStep, handleTrousers, handleJacket, handlePage}) => {
    const [jacketFabrics, setJacketFabrics] = useState([])
    const [trouserFabrics, setTrouserFabrics] = useState([])
    const [waistcoatFabrics, setWaistcoatFabrics] = useState([])
    const [selected, setSelected] = useState(0)
    const [chosenSet, setChosenSet] = useState(0)
    const [isOpen, setOpen] = useState(true);
    const ref = useRef(null);
    const snapTo = (i) => ref.current?.snapTo(i);

    useEffect(() => {
        handlePage('FabricPage');
        const set =  JSON.parse(sessionStorage.getItem("chosenSet"));
        setChosenSet(parseInt(set))
        const storedSizes = JSON.parse(sessionStorage.getItem("sizes"));
        //
        const jacket = JSON.parse(sessionStorage.getItem('jacket'))
        //}
        const trouser = JSON.parse(sessionStorage.getItem('trousers'))
        const fetchData = async () => {
        try {
            const jacketList = await fetch(
            `https://lunar-kindhearted-bun.glitch.me/getfabrics?title=${storedSizes.jacketSize}`
            );
            const jacketData = await jacketList.json();

            if ([0, 1, 2].includes(chosenSet)) {

            const jackets = jacketData.productVariants.edges
            .filter((edge) => edge.node.title.includes(jacket.title.toUpperCase()))
            .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id, 
                description: edge.node.product?.description,
            }));
            setJacketFabrics(jackets);

            }

            const trouserList = await fetch(
                `https://lunar-kindhearted-bun.glitch.me/getfabrics?title=${storedSizes.trouserSize}`
            );
            const trouserData = await trouserList.json();

            if ([0, 1, 3].includes(chosenSet)) {
                const trousers = trouserData.productVariants.edges
                .filter((edge) =>  edge.node.title.includes(trouser.title.toUpperCase()))
                .map((edge) => ({
                    img: edge.node.image?.url,
                    title: edge.node.product?.title,
                    price: edge.node.price,
                    id: edge.node.id, 
                    description: edge.node.product?.description,
                }));
                setTrouserFabrics(trousers);
            }

                const waistcoat = jacketData.productVariants.edges
                .filter((edge) => edge.node.title.includes("WAISTCOAT"))
                .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id, 
                description: edge.node.product?.description,
                }));
        
            
            setWaistcoatFabrics(waistcoat);
            
        } catch (error) {
            console.error(error);
        } 
        };
        fetchData();
    }, []);

    
    return (
        <>
        <div className="h-screen w-screen pointer-events-none justify-end items-center p-7 hidden md:flex relative z-10">
            <RightMotion width='w-2/6'>
            <div className='pointer-events-auto'>
            {[0, 1].includes(chosenSet) &&
                <div className={`bg-beige rounded-t-xl shadow-xl border-b border-charcoal text-sm  uppercase grid ${chosenSet === 0 ? 'grid-cols-3' : 'grid-cols-2'} text-center`}>
                    {[0, 1, 2].includes(chosenSet) && <div className={`px-9 py-2 rounded-tl-xl cursor-pointer ${selected === 0 ? 'bg-charcoal text-beige': 'hover:opacity-50'}`} onClick={() => setSelected(0)}>Jacket</div>}
                    {[0, 1, 3].includes(chosenSet) && (<div className={`py-2 ${chosenSet === 1 ? 'rounded-tr-xl': ''} cursor-pointer ${selected === 1 ? 'bg-charcoal text-beige': 'hover:opacity-50'}`} onClick={() => setSelected(1)}>Trousers</div>)}
                    {chosenSet === 0 && (<div className={`py-2 rounded-tr-xl cursor-pointer ${selected === 2 ? 'bg-charcoal text-beige': 'hover:opacity-50'}`} onClick={() => setSelected(2)}>Waistcoast</div>)}
                </div>
            }
            
            {[0, 1, 2].includes(chosenSet) && selected === 0 &&
            <FabricSelection click={onNextStep} productData={jacketFabrics} handleJacket={handleJacket} productType='JacketFabric'/>
            }
            
            
            {[0, 1, 3].includes(chosenSet) && selected === 1 &&
            <FabricSelection click={onNextStep} productData={trouserFabrics} handleTrousers={handleTrousers} productType='TrouserFabric'/>
            }
            
            
            {chosenSet === 0 && selected === 2 &&
            <FabricSelection click={onNextStep} productData={waistcoatFabrics} productType='WaistcoatFabric'/>
            }
            
            </div>
            </RightMotion>
        </div>
        <Sheet
        ref={ref}
        isOpen={isOpen}
        onClose={() => snapTo(1)}
        snapPoints={[600, 150, 0]}
        initialSnap={1}
        className='md:hidden'
        onSnap={snapIndex =>
            console.log('> Current snap point index:', snapIndex)
        }
        >
            <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
            <div className='mx-4'>
            {[0, 1].includes(chosenSet) &&
                <div className={`grid ${chosenSet === 0 ? 'grid-cols-3' : 'grid-cols-2'} text-center`}>
                    {[0, 1, 2].includes(chosenSet) && <div className={`relative py-2 cursor-pointer ${selected === 0 ? 'font-bold underline-small': 'hover:opacity-50'}`} onClick={() => setSelected(0)}>Jacket</div>}
                    {[0, 1, 3].includes(chosenSet) && (<div className={`relative py-2 cursor-pointer ${selected === 1 ? 'font-bold underline-small': 'hover:opacity-50'}`} onClick={() => setSelected(1)}>Trousers</div>)}
                    {chosenSet === 0 && (<div className={`relative py-2 cursor-pointer ${selected === 2 ? 'font-bold underline-small': 'hover:opacity-50'}`} onClick={() => setSelected(2)}>Waistcoast</div>)}
                </div>
            }
            {[0, 1, 2].includes(chosenSet) && selected === 0 &&
            <FabricSelection productData={jacketFabrics} productType='JacketFabric'/>
            }
            {[0, 1, 3].includes(chosenSet) && selected === 1 &&
            <FabricSelection productData={trouserFabrics} productType='TrouserFabric'/>
            }
            {chosenSet === 0 && selected === 2 &&
            <FabricSelection productData={waistcoatFabrics} productType='WaistcoatFabric'/>
            }
            </div>
            </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
        </Sheet>
        </>
    )
}

export default FabricPage