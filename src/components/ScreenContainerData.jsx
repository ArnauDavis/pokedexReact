import {useState, useEffect} from 'react'
import staticTv from "../assets/imgs/static.gif"

export default function ScreenContainer({dataFromFirstApi,dataFromSecondApi,isLoading,error}) {
 
  const [screen, setScreen] = useState('idle')
  
  useEffect(()=>{
      if (isLoading) {
      setScreen('loading');
    }else if(!dataFromFirstApi){
      setScreen('error')
    }else if(dataFromFirstApi){
      setScreen('success')
    }else{
      setScreen('idle')
    }
  }, [dataFromFirstApi,isLoading, error])
  let mainScreenContent
  dataFromFirstApi? mainScreenContent=(
      <div className=''>
      <h3>Putting variables here</h3>
      <span>{dataFromFirstApi.height/10} m</span>
      <br />
      <span>{dataFromFirstApi.id}</span>
      <br />
      <span>{dataFromFirstApi.name.toUpperCase()}</span>
      <br />
      <span>{dataFromFirstApi.types.map((x)=>x.type.name).join(' ')}</span>
      <br />
      <span><img src={dataFromFirstApi.sprites.front_default} alt="pokePic" /></span>
      <br />
       <span><img src={dataFromFirstApi.sprites.front_female? dataFromFirstApi.sprites.front_female: dataFromFirstApi.sprites.back_default} alt="pokePic" /></span>
      <br />
      <span>{dataFromFirstApi.weight/10} lbs.</span>
      <br />
      {dataFromSecondApi?  <span>{dataFromSecondApi.flavor_text_entries[0].flavor_text}</span> : <span>No data available</span> }
      </div>
      ): ''
  let renderResult
  if(screen == 'idle'){
    renderResult=<img className="w-full h-full object-fill rounded-l" src={staticTv} alt="pokeScreen" />
  }else if(screen=='success'){
    renderResult=mainScreenContent
  }else if(screen=="error")
    renderResult=<p>hey it worked!</p>
  return (
    <>
    <div className="h-80 mt-5 flex justify-center bg-green-300 backdrop-blur-md p-1 rounded-xl shadow-lg border-4 border-black shadow-[inset_0_0_0_4px_white]">
      {renderResult}
      
    </div>
    
    </>
  )
  }





