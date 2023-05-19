const ProgressBar = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100; // Calculate the progress percentage
console.log(progress, currentStep, totalSteps)
return (
    <div
    style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#e4e4e4',
    }}
    className="hidde md:flex absolute bottom-20 left-0 z-30 items-center"
    >
    <div
        style={{
        width: `${progress}%`,
        height: '100%',
        backgroundColor: '#2F2727',
        }}
        className="transition transition-all duration-200 ease-in"
    ></div>
    <div className="w-2 h-2 bg-charcoal rounded-full"></div>
    </div>
);
};

export default ProgressBar