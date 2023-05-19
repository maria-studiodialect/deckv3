import Link from "next/link"
import { useEffect, useState } from 'react';

const MeasurementsCalc = () => {
    const [formData, setFormData] = useState({});
    const [measurements, setMeasurements] = useState(null);

    useEffect(() => {
      const getFormData = () => {
        const storedFormData = sessionStorage.getItem('formData');
        return storedFormData ? JSON.parse(storedFormData) : {};
    };

    setFormData(getFormData());
  }, []);

    const calculateMeasurements = () => {
        // Convert height and weight to the required units
        const heightInCm = formData.heightUnit === 'cm' ? formData.height : formData.height * 2.54;
        const weightInKg = formData.weightUnit === 'kg' ? formData.weight : formData.weight * 0.453592;
    
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

            
      useEffect(() => {
        if (formData.height && formData.weight) {
          const calculatedMeasurements = calculateMeasurements();
          setMeasurements(calculatedMeasurements);
          sessionStorage.setItem("measurements", JSON.stringify(calculatedMeasurements));
        }
      }, [formData]);
    return (
        <></>
    )
}
export default MeasurementsCalc