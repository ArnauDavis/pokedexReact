

export default function ScreenContainer({dataFromFirstApi,dataFromSecondApi,isLoading,error}) {
  return (
    <>
    <div>
      { dataFromFirstApi &&
      <div>
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
              }
      {!dataFromFirstApi && <span>{error}</span>}
    </div> 
    </>
  )
}
