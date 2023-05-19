import ProductCard from '@/components/ProductCard'
import { useEffect, useState } from 'react'
import Waistcoast from '@/components/Waistcoast'
import SizeCalc from '@/components/SizeCalc'
import Loader from '../Loader'

const JacketPage = ({selectJacket, handlePage}) => {
    const [selectedJacket, setSelectedJacket] = useState(null);
    const [jacketOpacity, setJacketOpacity] = useState([1, 1, 1, 1]);
    const [isOpen, setIsOpen] = useState(false);
    const [jackets, setJackets] = useState([]);
    const [productNumber, setProductNumber] = useState(0);
    const [isImageReady, setIsImageReady] = useState(false);


    useEffect(() => {
        const chosenSet = sessionStorage.getItem("chosenSet"); 
        setProductNumber(parseInt(chosenSet))
        handlePage('JacketPage');
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
    
            const jackets = jacketData.productVariants.edges
            .filter((edge) => edge.node.product.title.includes("Jacket"))
            .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id,
                description: edge.node.product?.description
            }));

            setJackets(jackets);

        } catch (error) {
            console.error(error);
        } 
        };
        fetchData();
    }, []);

    const handleJacketClick = (index) => {
        setSelectedJacket(index);
        setJacketOpacity(jacketOpacity.map((o, i) => (i === index ? 1 : 0.5)));
        sessionStorage.setItem("jacket", index !== null ? JSON.stringify(jackets[index]) : null);
        selectJacket(true);
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
                
                <div className='uppercase mb-5 text-sm border-b pb-2'>Select your jacket silhouette</div>
                <div className='flex space-x-2  pb-4'>
                    {jackets.map((product, index) => (
                        <ProductCard
                        key={product.id}
                        img={product.img}
                        price={product.price}
                        title={product.title}
                        isChecked={index === selectedJacket}
                        handleCardClick={() => handleJacketClick(index)}
                        cardOpacity={jacketOpacity[index]}
                        imageLoad={imageLoad}
                        delay={index}
                        />
                    ))}
                </div>

                <div className='py-10'></div>
            </div>
        </div>
        <div className={isOpen ? 'block' : 'hidden'}>
            <Waistcoast href='/product-view'/>
        </div> 
        </>
    )
}

export default JacketPage