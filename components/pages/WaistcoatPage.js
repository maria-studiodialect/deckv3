import Head from 'next/head'
import Header from '@/components/Header'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { Suspense, useEffect, useState } from 'react'
import Waistcoast from '@/components/Waistcoast'
import ButtonNoLink from '@/components/ButtonNoLink'
import SizeCalc from '@/components/SizeCalc'
import Loader from '../Loader'

const WaistcoatPage = ({selectWaistcoat, handlePage}) => {
    const [selectedWaistcoat, setSelectedWaistcoat] = useState(null);
    const [waistcoatOpacity, setWaistcoatOpacity] = useState([1, 1, 1, 1]);
    const [isOpen, setIsOpen] = useState(false);
    const [waistcoat, setwaistcoat] = useState([]);
    const [productNumber, setProductNumber] = useState(0);
    const [isImageReady, setIsImageReady] = useState(false);
    const [step, setStep] = useState(1)


    useEffect(() => {
        const chosenSet = sessionStorage.getItem("chosenSet"); 
        setProductNumber(parseInt(chosenSet));
        handlePage('WaistcoatPage');
    }, []);

    useEffect(() => {
        const storedMeasurements = JSON.parse(sessionStorage.getItem("measurements"));

        const bustSize = parseFloat(storedMeasurements.bustCircumference);
        const waistSize = parseFloat(storedMeasurements.waistCircumference);

        const { jacketSize, trouserSize } = SizeCalc(bustSize, waistSize);
        var sizes = {'jacketSize': jacketSize, 'trouserSize' : trouserSize}

        sessionStorage.setItem("sizes", JSON.stringify(sizes));

        const fetchData = async () => {
        try {
            const jacketList = await fetch(
            `https://lunar-kindhearted-bun.glitch.me/getproducts?title=${jacketSize}`
            );
            const jacketData = await jacketList.json();

            const waistcoat = jacketData.productVariants.edges
            .filter((edge) => edge.node.product.tags.includes("waistcoat"))
            .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id,
                description: edge.node.product?.description
            }));

            setwaistcoat(waistcoat);

        } catch (error) {
            console.error(error);
        } 
        };
        fetchData();
    }, []);

    const handleWaistcoatClick = (index) => {
        setSelectedWaistcoat(index);
        setWaistcoatOpacity(waistcoatOpacity.map((o, i) => (i === index ? 1 : 0.5)));
        sessionStorage.setItem("waistcoat", index !== null ? JSON.stringify(waistcoat[index]) : null);
        selectWaistcoat(true);
    };



    const imageLoad = (e)=>{
        setIsImageReady(true)
        typeof onLoad === "function" && onLoad(e)
    }
    return (
        <>
        {!isImageReady && <Loader text='Generating Measurements' progress={false}/>}
        <div className="h-screen w-screen flex justify-center px-7 pt-[16vh] overflow-y-scroll relative z-10 bg-beige">
            <div>
                
                <div className='uppercase mb-5 text-sm border-b pb-2'>Select your waistcoat silhouette</div>
                {productNumber === 0 &&
                    <>
                    <div className='flex space-x-2  pb-4'>
                        {waistcoat.map((product, index) => (
                            <ProductCard
                            key={product.id}
                            img={product.img}
                            price={product.price}
                            title={product.title}
                            isChecked={index === selectedWaistcoat}
                            handleCardClick={() => handleWaistcoatClick(index)}
                            cardOpacity={waistcoatOpacity[index]}
                            imageLoad={imageLoad}
                            delay={index}
                            />
                        ))}
                    </div>
                    </>   
                }
                <div className='py-10'></div>
            </div>
        </div>
        <div className={isOpen ? 'block' : 'hidden'}>
            <Waistcoast href='/product-view'/>
        </div> 
        </>
    )
}

export default WaistcoatPage