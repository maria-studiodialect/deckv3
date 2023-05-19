import Link from "next/link"
import { useEffect, useState } from "react";

const RangeSlider = ({text, mainColour, href, icon}) => {
    const [value, setValue] = useState(2);
    useEffect(() => {
        const range = document.querySelector("input[type=range]");
        const ratio = (range.value - range.min) / (range.max - range.min)
    }, [value]);
    return (
        <div className="range-wrap relative flex h-[24px] w-full items-center">
        <input
            className="range relative flex w-full"
            aria-valuemin={0}
            type="range"
            min="0"
            max="4"
            step='1'
            value={value}
            id="slider"
            onChange={({ target: { value: radius } }) => {
                setValue(radius);
            }}
            />
            <div id="progress"></div>
        </div>
    )
}
export default RangeSlider