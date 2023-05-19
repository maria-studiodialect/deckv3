import ProductCard from '@/components/ProductCard'
import { useEffect, useState } from 'react'
import Waistcoast from '@/components/Waistcoast'
import SizeCalc from '@/components/SizeCalc'
import Loader from '../Loader'

const TrousersPage = ({selectTrousers, handlePage}) => {

    const [selectedTrousers, setSelectedTrousers] = useState(null);
    const [trousersOpacity, setTrousersOpacity] = useState([1, 1, 1, 1]);
    const [isOpen, setIsOpen] = useState(false);
    const [trousers, setTrousers] = useState([]);
    const [productNumber, setProductNumber] = useState(0);
    const [isImageReady, setIsImageReady] = useState(false);
    const [step, setStep] = useState(1)


    useEffect(() => {
        const chosenSet = sessionStorage.getItem("chosenSet"); 
        setProductNumber(parseInt(chosenSet));
        handlePage('TrousersPage');
    }, []);

    useEffect(() => {
        const storedMeasurements = JSON.parse(sessionStorage.getItem("measurements"));

        const bustSize = parseFloat(storedMeasurements.bustCircumference);
        const waistSize = parseFloat(storedMeasurements.waistCircumference);

        const { jacketSize, trouserSize } = SizeCalc(bustSize, waistSize);
        var sizes = {'jacketSize': jacketSize, 'trouserSize': trouserSize}

        sessionStorage.setItem("sizes", JSON.stringify(sizes));

        const fetchData = async () => {
        try {
           

            const trouserList = await fetch(
                `https://lunar-kindhearted-bun.glitch.me/getproducts?title=${trouserSize}`
            );
            const trouserData = await trouserList.json();

            // console.log(trouserData.productVariants.edges[3].node.product.tags.includes("trousers"))
    
            const trousers = trouserData.productVariants.edges
            .filter((edge) => edge.node.product.tags.includes("trousers"))
            .map((edge) => ({
                img: edge.node.image?.url,
                title: edge.node.product?.title,
                price: edge.node.price,
                id: edge.node.id,
                description: edge.node.product?.description
            }));

            setTrousers(trousers);

        } catch (error) {
            console.error(error);
        } 
        };
        fetchData();
    }, []);


    const handleTrousersClick = (index) => {
        setSelectedTrousers(index);
        setTrousersOpacity(trousersOpacity.map((o, i) => (i === index ? 1 : 0.5)));
        sessionStorage.setItem("trousers", index !== null ? JSON.stringify(trousers[index]) : null);
        selectTrousers(true);
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
                
                <div className='uppercase mb-5 text-sm border-b pb-2'>Select your trouser silhouette</div>
                <div className='flex space-x-2  pb-4'>
                    {trousers.map((product, index) => (
                        <ProductCard
                        key={product.id}
                        img={product.img}
                        price={product.price}
                        title={product.title}
                        isChecked={index === selectedTrousers}
                        handleCardClick={() => handleTrousersClick(index)}
                        cardOpacity={trousersOpacity[index]}
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

export default TrousersPage