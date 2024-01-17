import Image from 'next/image'
import Button from '@/components/Button'
import CustomSelect from '@/components/CustomSelect'
import Link from 'next/link'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'



const BaseInfoPage = ({onNextStep, onPrevStep, handleSize}) => {
    const router = useRouter();
    const [width, setWidth] = useState()
  
    const skin = [
      { value: '1', label: 'Very Light', color: '#f1e4d7' },
      { value: '2', label: 'Light', color: '#f1dcb8' },
      { value: '3', label: 'Light Medium', color: '#e2b58f' },
      { value: '4', label: 'Medium', color: '#c9975c' },
      { value: '5', label: 'Medium Dark', color: '#a06b3f' },
      { value: '6', label: 'Dark', color: '#7f3e2e' },
      { value: '7', label: 'Very Dark', color: '#5d2518' },
      { value: '8', label: 'Deep', color: '#3c1212' },
    ]
  
    useEffect(() => {
      setWidth(window.innerWidth);
    })
  
    const [name, setName] = useState('');
    const [skinTone, setSkinTone] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
  
    const convertWeightUnits = (value, prevUnit, newUnit) => {
      if (prevUnit === newUnit || isNaN(parseFloat(value))) return value;
    
      const conversionFactors = {
        'kg': { 'lb': 2.20462, 'st': 0.157473 },
        'lb': { 'kg': 0.453592, 'st': 0.071429 },
        'st': { 'kg': 6.35029, 'lb': 14 },
      };
    
      const convertedValue = parseFloat(value) * conversionFactors[prevUnit][newUnit];
      return isNaN(convertedValue) ? value : convertedValue.toFixed(2);
    };
    
    const convertHeightUnits = (value, prevUnit, newUnit) => {
      if (prevUnit === newUnit || isNaN(parseFloat(value))) return value;
    
      const conversionFactor = prevUnit === 'cm' ? 0.393701 : 2.54;
      const convertedValue = parseFloat(value) * conversionFactor;
      return isNaN(convertedValue) ? value : convertedValue.toFixed(2);
    };
    const handleHeightUnitChange = (e) => {
      const newUnit = e.target.value;
      setHeight(convertHeightUnits(height, heightUnit, newUnit));
      setHeightUnit(newUnit);
    };
  
    const handleWeightUnitChange = (e) => {
      const newUnit = e.target.value;
      setWeight(convertWeightUnits(weight, weightUnit, newUnit));
      setWeightUnit(newUnit);
    };
  
    const handleColorChange = (selectedOption) => {
      setSkinTone(selectedOption.color);
    };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!height || !weight) {
      alert('Please fill in the required fields: height and weight');
      return;
    }
    if (parseFloat(height) > 211) {
      alert('Please get in touch');
      return;
    }
  
    const submittedData = {
      name, 
      age,
      skinTone,
      height,
      weight,
      heightUnit,
      weightUnit,
    };
  
    sessionStorage.setItem('formData', JSON.stringify(submittedData));
    onNextStep();
    const calculateMeasurements = () => {
      // Convert height and weight to the required units
      const heightInCm = heightUnit === 'cm' ? height : height * 2.54;
      const weightInKg = weightUnit === 'kg' 
        ? weight 
        : weightUnit === 'lb' 
          ? weight * 0.453592 
          : weight * 6.35029;
  

      // Calculate BMI
      const BMI = weightInKg / ((heightInCm / 100) * (heightInCm / 100));
  
      // Initialize the measurements object
      let measurements = {};
  
      if (BMI <= 18.5) {
        // Below average
        measurements = {
          bustCircumference: 0.457 * heightInCm,
          waistWidth: 0.135 * heightInCm,
          waistCircumference: 0.33 * heightInCm,
          hipWidth: 0.19 * heightInCm,
          hipCircumference: 0.49 * heightInCm,
          thighCircumference: -5.472 + 0.283 * heightInCm + 0.172 * weightInKg + 4.534,
          shoulderWidth: 0.245 * heightInCm,
          armLength: 0.312 * heightInCm,
          legLength: 0.524 * heightInCm,
        };
      } else if (BMI <= 24.9) {
        // Average
        measurements = {
          bustCircumference: 0.53 * heightInCm,
          waistWidth: 0.14 * heightInCm,
          waistCircumference: 0.35 * heightInCm,     
          hipWidth: 0.21 * heightInCm,
          hipCircumference: 0.53 * heightInCm,
          thighCircumference: -5.472 + 0.283 * heightInCm + 0.172 * weightInKg + 4.534,
          shoulderWidth: 0.245 * heightInCm,
          armLength: 0.312 * heightInCm,
          legLength: 0.524 * heightInCm,
        };
      } else {
        // Above average
        measurements = {
          bustCircumference: 0.578 * heightInCm,
          waistWidth: 0.18 * heightInCm,
          waistCircumference: 0.46 * heightInCm,
          hipWidth: 0.24 * heightInCm,
          hipCircumference: 0.61 * heightInCm,
          thighCircumference: -5.472 + 0.283 * heightInCm + 0.172 * weightInKg + 4.534,
          shoulderWidth: 0.245 * heightInCm,
          armLength: 0.312 * heightInCm,
          legLength: 0.524 * heightInCm,
        };
      }
  
      const formattedMeasurements = Object.entries(measurements).reduce((acc, [key, value]) => {
          acc[key] = parseFloat(value.toFixed(1));
          return acc;
        }, {});
      
      return formattedMeasurements;
    };
    const calculatedMeasurements = calculateMeasurements();
    handleSize(calculatedMeasurements);
  };
  
    return (
        <div className='absolute top-0 left-0 z-20'>
        <Header fill={ width < 1024 ? '#2F2727' : 'white'}/>
        <div className='grid md:grid-cols-2 bg-beige md:min-h-screen'>
            <motion.div initial={{x: -100}} whileInView={{x:0}} transition={{stiffness: 50, duration: 0.7}} className='relative w-[50vw] h-screen z-0 hidden lg:block'>
            <Image src='/bg-img.webp' fill className='object-cover' />
            </motion.div>
        <div className='bg-beige flex justify-center items-center mt-32 mb-48 px-7 lg:pt-0 md:px-24'>
            <motion.div initial={{y:100, opacity:0}} whileInView={{y:0, opacity:1}} transition={{stiffness: 50, duration: 0.7}} >
            <div className='mb-3'>ENTER YOUR BASE INFORMATION</div>
            <div className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper bibendum dui, nec condimentum quam dignissim in.</div>
            <form action="/send-data-here" method="post">
                <div className='grid md:grid-cols-2 mt-10 gap-8 md:mb-10'>
                <div>
                <label className='text-sm md:text-base' htmlFor="first">NAME</label><br/>
                <input onChange={(e) => setName(e.target.value)} type="text" id="first" name="first" className='bg-transparent border-b border-charcoal mt-3 text-sm py-2 w-full'/>
                </div>
                <div>
                <label className='text-sm md:text-base' htmlFor="last">AGE</label><br/>
                <input onChange={(e) => setAge(e.target.value)} type="text" id="last" name="last" className='bg-transparent border-b border-charcoal mt-3 text-sm py-2 w-full'/>
                </div>
                <div>
                    <label className='text-sm md:text-base' htmlFor="height">HEIGHT</label><br />
                    <div className="grid grid-cols-[70%_30%]">
                    <input
                        type="text"
                        id="height"
                        name="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className='bg-transparent border-b border-charcoal mt-3 text-sm py-1 mr-3 flex-1 pt-1'
                    />
                    <select
                        id="heightUnits"
                        name="heightUnits"
                        value={heightUnit}
                        onChange={handleHeightUnitChange}
                        className='bg-transparent border-b border-charcoal mt-3 text-sm py-1 pt-1'
                    >
                        <option value="cm">cm</option>
                        <option value="in">inches</option>
                    </select>
                    </div>
                </div>
                <div>
                    <label className='text-sm md:text-base' htmlFor="weight">WEIGHT</label><br />
                    <div className="grid grid-cols-[70%_30%]">
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className='bg-transparent border-b border-charcoal mt-3 text-sm pb-1 mr-3 flex-1 pt-1'
                    />
                    <select
                        id="weightUnits"
                        name="weightUnits"
                        value={weightUnit}
                        onChange={handleWeightUnitChange}
                        className='bg-transparent border-b border-charcoal mt-3 text-sm pb-1 pt-1'
                    >
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                        <option value="st">st</option>
                    </select>
                    </div>
                </div>

                </div>
                <CustomSelect opt={skin} ph='SKIN TONE (OPTIONAL)' change={handleColorChange}/>
                {/*<button type="submit">Submit</button>*/}
            </form>
            </motion.div>
        </div>
        </div>
        <div className='fixed md:static bg-charcoal flex justify-between items-center mr-14 md:fixed bottom-0 pb-3 w-full pt-2 md:pb-3.5 px-3 md:px-7 md:bg-transparent'>
        <div onClick={onPrevStep}>
        <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 w-7 rotate-180">
            <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
            <path d="M50 18.5L0 18.5" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
        </div>
        <div onClick={handleSubmit} className={`cursor-pointer text-beige md:text-charcoal px-3 py-2 xxl:px-8 xxl:py-6 flex items-center font-editorial text-2xl`}>
                Next step
                <svg width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3 w-7 stroke-white	md:stroke-charcoal">
                    <path d="M31.25 0.5C31.25 0.5 34.3071 18.5 50 18.5"  stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M31.25 36.5C31.25 36.5 34.3071 18.5 50 18.5"  stroke-width="2" stroke-miterlimit="10"/>
                    <path d="M50 18.5L0 18.5"  stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
      </div>
        </div>
    )
}
export default BaseInfoPage
