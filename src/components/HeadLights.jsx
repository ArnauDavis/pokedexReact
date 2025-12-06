import {useState, useEffect} from 'react'


export default function HeadLights({dataFromFirstApi,isLoading,error}){
    const [lights, setLights] = useState('idle')
    useEffect(()=>{
          if (isLoading) {
          setLights('loading');
        }else if(error){
          setLights('error')
        }else if(dataFromFirstApi){
          setLights('success')
        }else{
          setLights('idle')
        }
    }, [dataFromFirstApi,isLoading, error])

    let simpleStyle = "p-3 border-2 border-black rounded-full"
    let bootRing = (lights === 'idle' || lights === 'error')? "border-green-800" : "border-green-500"
    let bootLight = (lights === 'idle' || lights === 'error')? "bg-black" : "bg-blue-500"
    let idleLight = (lights === 'idle' || lights === 'error')? 'bg-red-400' : 'bg-red-800'
    let loadingLight = lights=='loading'? "bg-yellow-400" : "bg-yellow-800"
    let resultLight = lights=='success'? "bg-green-400" : "bg-green-800"

    return(
        <>
        <div className="flex justify-end items-center">
                <span className={`p-5 border-4 ${bootRing} rounded-full ${bootLight}`}></span>
                <div className="flex ml-2 space-x-2">
                    <span className={`${simpleStyle} ${idleLight}`}></span>
                    <span className={`${simpleStyle} ${loadingLight}`}></span>
                    <span className={`${simpleStyle} ${resultLight}`}></span>
                </div>
            </div>
        </>
    )
}