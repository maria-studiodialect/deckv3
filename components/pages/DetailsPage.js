import Link from "next/link"
import { useEffect, useState, useRef } from 'react'
import MeasurementsCalc from '@/components/MeasurementsCalc'
import Sheet, { SheetRef } from 'react-modal-sheet';
import YourDetails from '@/components/YourDetails'
import RefineProportions from '@/components/RefineProportions'
import Button from '@/components/Button'
import YourMeasurements from "../YourMeasurements";
import LeftMotion from "../LeftMotion";
import RightMotion from "../RightMotion";


const DetailsPage = ({handleSize, onPrevStep}) => {
    const [isOpen, setOpen] = useState(true);
    const ref = useRef(null);
    const snapTo = (i) => ref.current?.snapTo(i);
    return (
        <>
        <div className="absolute top-0 left-0 z-10 h-screen w-screen justify-between items-center md:p-7 hidden md:flex pointer-events-none">
        <LeftMotion width='w-1/4'>
        <YourDetails onPrevStep={onPrevStep}/>
        </LeftMotion>
        <RightMotion width='w-1/4'>
        <YourMeasurements handleSize={handleSize}/>
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
                <YourDetails/>
            </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop />
        </Sheet>
        </>
    )
}
export default DetailsPage
