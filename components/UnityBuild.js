import React, { useEffect, useCallback } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'
import Loader from './Loader';
import { useState } from 'react';


function UnityBuild() {
    const { unityContext, unityProvider, sendMessage, addEventListener, removeEventListener, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: '/unity/Build/TheDeckModelViewer.loader.js',
        dataUrl: '/unity/Build/TheDeckModelViewer.data',
        frameworkUrl: '/unity/Build/TheDeckModelViewer.framework.js',
        codeUrl: '/unity/Build/TheDeckModelViewer.wasm',
    });

    const [formData, setFormData] = useState({});

    useEffect(() => {
        const storedMeasurements = JSON.parse(sessionStorage.getItem("measurements"));
        setFormData(JSON.stringify(storedMeasurements));
      }, [sessionStorage.getItem("measurements")]);
      

    useEffect(() => {
        if (isLoaded) {
            sendMessage("[Bridge]", "SetSizeData", formData);
        }
    }, [isLoaded, formData, sendMessage]);

    console.log(formData)

    function handleSize(size) {
        console.log(size);
    }
    
    function handleColor() {
        // sendMessage("[Bridge]", "SetSizeData", formData);
        sendMessage("[Bridge]", "ShowGarments");
    }
    function handlePose() {

        sendMessage("[Bridge]", "ChangePose");
    }

    function handleFabric() {

        sendMessage("[Bridge]", "ChangeOuterFabricJacket", '5');
    }

    
    return (
        <>
        <div style={{ position: 'fixed', top: '0', left:'0', width: '100%', height: '100%', paddingBottom: '56.25%' }} className='z-0'>
        {!isLoaded && (
            <Loader text={'Generating measurements'} progress={Math.round(loadingProgression * 100)} />
        )}
        <Unity
            unityProvider={unityProvider}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
            />
        </div>
        <div className='absolute top-0 right-0 w-screen h-screen pointer-events-none flex justify-center items-end pb-20 space-x-4'><button onClick={handleColor} className='z-10 pointer-events-auto h-fit bg-slate-200 px-5 py-1 rounded-2xl'>Garment</button><button onClick={handlePose} className='z-10 pointer-events-auto h-fit bg-slate-200 px-5 py-1 rounded-2xl'>Change Pose</button><button onClick={handleFabric} className='z-10 pointer-events-auto h-fit bg-slate-200 px-5 py-1 rounded-2xl'>Change Fabric</button></div>
        </>
    )
}

export default UnityBuild
