import {useState} from 'react'
import HeadLights from "./HeadLights"
import SearchBar from "./SearchBar"
import ScreenContainerData from './ScreenContainerData'
import NextUp from './NextUp'
export default function MainScreen() {

  const [pokemonName, setPokemonName] = useState('')
  const handleInputChange = (event) => {
        setPokemonName(event.target.value.toLowerCase()); 
    }

  const [firstApiResponse, setfirstApiResponse] = useState(null)
  const [secondApiResponse, setSecondApiResponse] = useState(null)
  const [pokeTypeImg, setpokeTypeImg] = useState(null)
  const [pokeHeight, setpokeHeight] = useState(null)
  const [pokemonNumber, setPokemonNumber] = useState(null)
  const [pokeName, setPokeName] = useState(null)
  const [pokePic, setPokePic] = useState(null)
  const [pokeSecondPic, setPokeSecondPic] = useState(null)
  const [pokeWeight, setpokeWeight] = useState(null)
  const [pokeDescription, setPokeDescription] = useState(null)
  
  
  const [pokeType, setpokeType] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
    const fetchPokemon = async (event) => {
      if (event) {
        event.preventDefault() 
    }
    if(pokemonName==''){
      setError('No input detected')
      return
    }
      // --- Step 1: Initialization ---
    setIsLoading(true)
    setError(null)
    setfirstApiResponse(null)
    setpokeTypeImg(null)
    setSecondApiResponse(null)
      try {
    // --- Step 2: FIRST FETCH (Get general poke data) ---
    //from this fetch we will get cries, height, id, name, pictures, type, and weight
    const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    if (!pokeApiResponse.ok) {
      throw new Error(`first fetch failed: ${pokeApiResponse.status}`);
    }
    
    const dataFromFirstApi = await pokeApiResponse.json();
    setfirstApiResponse(dataFromFirstApi) // Save the result of the first fetch
    setpokeHeight(dataFromFirstApi.height)
    setPokemonNumber(dataFromFirstApi.id)
    setPokeName(dataFromFirstApi.name.toUpperCase())
    setPokePic(dataFromFirstApi.sprites.front_default)
    if(dataFromFirstApi.sprites.front_female){
      setPokeSecondPic(dataFromFirstApi.sprites.front_female)
    }else if(!dataFromFirstApi.sprites.front_female){
      setPokeSecondPic(dataFromFirstApi.sprites.back_default)
    }
    setpokeWeight(dataFromFirstApi.weight)
    setpokeType(dataFromFirstApi.types.map((x)=>x.type.name).join(' '))
    // now we can get the poke id to get more info in second fetch
    const pokeId = dataFromFirstApi.id
    //here I'm getting the images for the types
    try{
      let typeLinkArr = []
      let typeSprites = []
      dataFromFirstApi.types.forEach((x)=>typeLinkArr.push(x.type.url))
      const p1 = typeLinkArr.map(async(url)=>{
        const response = await fetch(url)
        if(!response.ok){
          throw new Error(`Failed to fetch ${url}: ${response.statusText}, this is for the types`)
        }
        return response.json()
      })
      const typeImg = await Promise.all(p1)
      typeImg.forEach((x)=>{
        typeSprites.push(x.sprites["generation-viii"]["brilliant-diamond-and-shining-pearl"]["name_icon"])
      })
      setpokeTypeImg(typeSprites)
    }catch(typeImageError){
      console.warn("error getting type images", typeImageError)
    }
    // --- Step 3: SECOND FETCH (get more data from a different url using the poke id) ---
    // this fetch will give us a description of the pokemon
    try {
            const secondPokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`)
            if (!secondPokeApiResponse.ok) {
                // We log the non-critical error but DO NOT throw or set global state.
                console.warn(`Second fetch failed, status: ${secondPokeApiResponse.status}. All good, default description will load`)
                // Return here to skip processing the response body if the fetch failed.
                return
            }
            const dataFromSecondApi = await secondPokeApiResponse.json()
            setSecondApiResponse(dataFromSecondApi)
            setPokeDescription(dataFromSecondApi.flavor_text_entries[0].flavor_text)
        } catch (innerError) {
            // Catches network errors or issues parsing the JSON for the second fetch.
            console.warn("Non-critical error during second fetch:", innerError)
            // Crucially, we do NOTHING with the global setError here.
        }
    } catch (outerError) {
        // --- Step 4: Critical Error Handling (Only for Step 2 failure) ---
        console.error("Critical fetching error:", outerError)
        setError(`Data load error: ${outerError.message}`)
    } finally {
        // --- Step 5: Finalization ---
        setIsLoading(false)
    }
  }
  
  return (
    <>
    <HeadLights/>
    <ScreenContainerData dataFromFirstApi={firstApiResponse}  typeSprites={pokeTypeImg} dataFromSecondApi={secondApiResponse} isLoading={isLoading} error={error}/>
    <NextUp/>
    <SearchBar pokemonName={pokemonName} handleInputChange={handleInputChange} triggerFetch={fetchPokemon} isFetching={isLoading}/>
    </>
  )
}