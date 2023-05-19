import Link from "next/link"
import { useEffect, useState } from 'react';

const YourMeasurements = ({handleSize}) => {
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
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
          
      useEffect(() => {
        const calculatedMeasurements = calculateMeasurements();
      
        const getStoredMeasurements = () => {
          const storedMeasurements = sessionStorage.getItem("measurements");
          if (storedMeasurements) {
            const parsedMeasurements = JSON.parse(storedMeasurements);
            if (parsedMeasurements && !Object.values(parsedMeasurements).includes(null)) {
              return parsedMeasurements;
            }
          }
          if (calculatedMeasurements) {
            sessionStorage.setItem("measurements", JSON.stringify(calculatedMeasurements));
          }
          return calculatedMeasurements;
        };
      
        const storedMeasurements = getStoredMeasurements();
      
        if (storedMeasurements) {
          setMeasurements(storedMeasurements);
        }
      }, []);
      

      const handleInputChange = (event, key) => {
        const value = parseFloat(event.target.value) || 0;
        setMeasurements((prevMeasurements) => ({ ...prevMeasurements, [key]: value }));
      };
      
      const saveUpdatedMeasurements = () => {
        // sessionStorage.setItem("updatedMeasurements", JSON.stringify(measurements));
        setIsEditing(false);
      };

      const toggleEditMode = () => {
        if (isEditing) {
          saveUpdatedMeasurements();
          sessionStorage.setItem("measurements", JSON.stringify(measurements));
          handleSize(measurements)
        } else {
          setIsEditing(true);
        }
      };

    return (
        <div className="bg-beige rounded-xl px-9 pb-9 pt-5 text-sm md:text-sm md:p-9 md:w-full md:shadow-xl pointer-events-auto">
            <div className="uppercase">YOUR MeasurementS</div>

            {measurements &&
            <>
            <div className="grid grid-cols-[0.7fr_0.3fr] gap-3 mt-3 md:mt-5 border-y py-3 md:py-5 text-xs md:text-xs">
              <div>SHOULDER WIDTH</div>
                {isEditing ? (
                  <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.shoulderWidth || ''}
                    onChange={(event) => handleInputChange(event, "shoulderWidth")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                  </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.shoulderWidth || ''} CM</div>
                )}
                
              <div>SLEEVE LENGTH</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.armLength || ''}
                    onChange={(event) => handleInputChange(event, "armLength")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.armLength || ''} CM</div>
                )}
              <div>BUST</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.bustCircumference || ''}
                    onChange={(event) => handleInputChange(event, "bustCircumference")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.bustCircumference || ''} CM</div>
                )}
              <div>WAIST WIDTH</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.waistWidth || ''}
                    onChange={(event) => handleInputChange(event, "waistWidth")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.waistWidth || ''} CM</div>
                )}
              <div>WAIST AROUND</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.waistCircumference || ''}
                    onChange={(event) => handleInputChange(event, "waistCircumference")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.waistCircumference || ''} CM</div>
                )}
            </div>
            <div className="grid grid-cols-[0.7fr_0.3fr] gap-3 mb-3 md:mb-5 border-b py-3 md:py-5 text-xs md:text-xs">
              <div>HIPS WIDTH</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.hipWidth || ''}
                    onChange={(event) => handleInputChange(event, "hipWidth")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.hipWidth || ''} CM</div>
                )}
              <div>HIPS AROUND</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.hipCircumference || ''}
                    onChange={(event) => handleInputChange(event, "hipCircumference")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.hipCircumference || ''} CM</div>
                )}
              <div>THIGH AROUND</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.thighCircumference || ''}
                    onChange={(event) => handleInputChange(event, "thighCircumference")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.thighCircumference || ''} CM</div>
                )}
              <div>LEG LENGTH</div>
              {isEditing ? (
                <div className="flex justify-self-end">
                  <input
                    type="number"
                    step="0.1"
                    value={measurements.legLength || ''}
                    onChange={(event) => handleInputChange(event, "legLength")}
                    className="bg-transparent max-w-[3.5em] border-b border-charcoal"
                  />
                  <label className="cm-label">CM</label>
                </div>
                ) : (
                  <div className="justify-self-end w-fit border-b border-transparent">{measurements.legLength || ''} CM</div>
                )}

            </div>
            </>
            }
           <button
              className="border border-charcoal p-2 text-center text-sm w-full uppercase hover:bg-charcoal hover:text-beige"
              onClick={toggleEditMode}
            >
              {isEditing ? "SAVE MEASUREMENTS" : "EDIT MEASUREMENTS"}
            </button>
        </div>
    )
}
export default YourMeasurements