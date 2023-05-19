import Head from 'next/head'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Link from 'next/link'
import ChosenProduct from '@/components/ChosenProduct'
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useEffect, useRef, useState } from 'react'
import LeftMotion from '../LeftMotion'

const ProductPage = ({onNextStep, start, pose, screenshot, handlePage}) => {
    const [isOpen, setOpen] = useState(true);
    const ref = useRef(null);
    const snapTo = (i) => ref.current?.snapTo(i);
    useEffect(() => {
        start();
        pose();
        handlePage('ProductPage');
    })

    
    return (
        <>
        <div className="h-screen w-screen pointer-events-none justify-between items-center p-7 hidden md:flex relative z-10">
            <LeftMotion width='w-1/4'>
            <ChosenProduct screenshotClick={screenshot} handleClick={onNextStep} pose={pose}/>
            </LeftMotion>
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
                <ChosenProduct handleClick={onNextStep} pose={pose}/>
            </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
        </Sheet>
        </>
    )
}

export default ProductPage