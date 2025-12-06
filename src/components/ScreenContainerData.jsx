import {useState, useEffect} from 'react'
import staticTv from "../assets/imgs/static.gif"
import errorScreen from '../assets/imgs/error.gif'
import Loading from '../assets/Loading'
export default function ScreenContainer({dataFromFirstApi,typeSprites,dataFromSecondApi,isLoading,error}) {
 
  const [screen, setScreen] = useState('idle')
  
  useEffect(()=>{
      if (isLoading) {
      setScreen('loading');
    }else if(error){
      setScreen('error')
    }else if(dataFromFirstApi){
      setScreen('success')
    }else{
      setScreen('idle')
    }
  }, [dataFromFirstApi,isLoading, error])
  let mainScreenContent
  dataFromFirstApi? mainScreenContent=(
      <div className='flex flex-col space-y-1 p-2'>
        <div className='flex justify-start space-x-12'>
          <span><img className="w-40 h-40" src={dataFromFirstApi.sprites.front_default} alt="pokePic" /></span>
          <div className='flex flex-col items-start justify-center space-y-2'>
            <span>{dataFromFirstApi.name.toUpperCase()}</span>
            <span>ID: {String(dataFromFirstApi.id).padStart(3, '0')}</span>
            <span>
              <ul className="flex list-none p-0 m-0 space-x-2">
            {typeSprites && typeSprites.map((data, index) => (
              <li key={index}>
                <img className='w-20' src={data} alt="typeSprite" />
              </li>
            ))}
          </ul>
            </span>
          </div>
        </div>
        <div className='flex justify-around pb-4'>
          <span>HT {dataFromFirstApi.height/10} m</span>
          <span>WT {dataFromFirstApi.weight/10} lbs.</span>
        </div>
      {dataFromSecondApi ? (
            <div className='flex justify-around'> 
              <div className='w-11/12 text-center'>
                <span>{dataFromSecondApi.flavor_text_entries[0].flavor_text}</span>
              </div>
            </div>
        ) : (
            <div className='flex justify-around'>
                <span>No data available</span>
            </div>
        )}
    </div>
  ):null
  let renderResult
  if(screen == 'idle'){
    renderResult=<img className="w-full h-full object-fill rounded-l" src={staticTv} alt="pokeScreen" />
  }else if(screen=='success'){
    renderResult=mainScreenContent
  }else if(screen=='loading'){
    renderResult=<Loading/>
  }else if(screen=="error")
    renderResult=<img className="w-full h-full object-fill rounded-l" src={errorScreen} alt="errorScreen" />
  return (
    <>
    <div className={`h-80 mt-5 flex justify-center ${(screen === 'idle' || screen === 'error')? 'bg-black': 'bg-green-400'} backdrop-blur-md p-1 rounded-xl shadow-lg border-4 border-black shadow-[inset_0_0_0_4px_white]`}>
      {renderResult}
      
    </div>
    
    </>
  )
  }





