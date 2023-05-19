import Head from 'next/head'
import Image from 'next/image'
import ButtonClick from '@/components/ButtonClick'
import Header from '@/components/Header'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import FinalProduct from '@/components/FinalProduct'
import Sheet, { SheetRef } from 'react-modal-sheet';
import LeftMotion from '../LeftMotion'

const CheckoutPage = ({handlePrev, handlePage}) => {
    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const [jacket, setJacket] = useState(null);
    const [trouser, setTrouser] = useState(null);
    const [waistcoat, setWaistcoat] = useState(null);
    const [jacketFabric, setJacketFabric] = useState(null);
    const [trouserFabric, setTrouserFabric] = useState(null);
    const [waistcoatFabric, setWaistcoatFabric] = useState(null);
    const [isOpen, setOpen] = useState(true);
    const ref = useRef(null);
    const snapTo = (i) => ref.current?.snapTo(i);

    useEffect(() => {
        handlePage('CheckoutPage');
      // const storedSizes = JSON.parse(sessionStorage.getItem("sizes"));
        const storedJacket = JSON.parse(sessionStorage.getItem('jacket'));
        const storedTrouser = JSON.parse(sessionStorage.getItem('trousers'));
        const storedWaistcoat = JSON.parse(sessionStorage.getItem('waistcoat'));
        const storedJacketFabric = JSON.parse(sessionStorage.getItem('selectedJacketFabric'));
        const storedTrouserFabric = JSON.parse(sessionStorage.getItem('selectedTrouserFabric'));
        const storedWaistcoatFabric = JSON.parse(sessionStorage.getItem('selectedWaistcoatFabric'));



        if (storedJacket !== null) {
            setJacket(storedJacket);
        }
        if (storedWaistcoat !== null) {
            setWaistcoat(storedWaistcoat);
        }
        if 
        (storedTrouser !== null) {
            setTrouser(storedTrouser);
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
        }, []);


        async function handleCreateCheckout() {
        const lineItems = [  ...(jacket ? [{ quantity: 1, variantId: jacket.id }] : []),
            ...(trouser ? [{ quantity: 1, variantId: trouser.id }] : []),
            ...(waistcoat ? [{ quantity: 1, variantId: waistcoat.id }] : []),
            ...(jacketFabric ? [{ quantity: 1, variantId: jacketFabric.id }] : []),
            ...(trouserFabric ? [{ quantity: 1, variantId: trouserFabric.id }] : []),
            ...(waistcoatFabric ? [{ quantity: 1, variantId: waistcoatFabric.id }] : []),
        ];

            console.log(lineItems)
        
            const response = await fetch('/api/createCheckout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lineItems }),
            });
        
            const data = await response.json();
        
            if (!response.ok) {
            throw new Error(data.message);
            }
        
            window.open(data.webUrl, '_blank', 'noopener,noreferrer'); // Open the checkout URL in a new tab or window
        }

    return (
        <>
        <div className="h-screen w-screen hidden md:flex justify-between items-center p-7 relative z-10 pointer-events-none">
        <FinalProduct/>
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
                <FinalProduct/>
            </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
        </Sheet>
        <div className='flex justify-between items-center mr-14 absolute bottom-0 pt-2 pb-2 md:pb-3.5 w-full px-3 md:px-7 z-[99999999] bg-charcoal text-beige md:text-charcoal md:bg-transparent'>
            <div onClick={handlePrev}>
            <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 w-7 rotate-180 stroke-beige md:stroke-charcoal">
                <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M50 18.5L0 18.5" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
            </div>
            <ButtonClick click={handleCreateCheckout} mainColour='text-beige md:text-charcoal' text='Checkout' icon='#2F2727' />
        </div>
        </>
    )
}

export default CheckoutPage