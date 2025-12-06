import {useState} from 'react'
import HeadLights from "./HeadLights"
import SearchBar from "./SearchBar"
import ScreenContainerData from './ScreenContainerData'
import NextUp from './NextUp'
export default function MainScreen() {

  const [pokemonName, setPokemonName] = useState('')
  const handleInputChange = (param) => {
        setPokemonName(param.target.value.toLowerCase()); 
    }

  const [firstApiResponse, setfirstApiResponse] = useState(null)
  const [secondApiResponse, setSecondApiResponse] = useState(null)
  const [pokeTypeImg, setpokeTypeImg] = useState(null)
  const [pokeType, setpokeType] = useState(null)
  const [nextPoke, setNextPoke] = useState(null)
  const [prevPoke, setPrevPoke] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const MAX_POKEMON_ID = 1025
    const fetchPokemon = async (param) => {
      let identifier = ''
    if (param && typeof param.preventDefault === 'function'){
      param.preventDefault()
      identifier = pokemonName
    }else if (typeof param === 'string') {
      identifier = param
      setPokemonName(param)
    }

    if (identifier === '') {
        setError('No input detected')
        return
    }
      // Initialization
    setIsLoading(true)
    setError(null)
    setfirstApiResponse(null)
    setpokeTypeImg(null)
    setSecondApiResponse(null)
      try {
    // --- getting general data
    //from this fetch we will get cries, height, id, name, pictures, type, and weight
    const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`)
    
    if (!pokeApiResponse.ok) {
      throw new Error(`first fetch failed: ${pokeApiResponse.status}`)
    }
    
    const dataFromFirstApi = await pokeApiResponse.json()
    setfirstApiResponse(dataFromFirstApi) // Save the result of the first fetch
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
    }
    catch(typeImageError){
      console.warn("error getting type images", typeImageError)
    }
   // Fetch and set the NEXT Pokémon
    if (pokeId < 1025) {
        try {
            const nextPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId + 1}/`)
            if (nextPokemon.ok) {
                const nextUp = await nextPokemon.json()
                setNextPoke(nextUp.name)
            } else {
                console.warn(`Could not find next pokemon, status: ${nextPokemon.status}`)
                setNextPoke(null)
            }
        } catch (nextError) {
            console.warn("Non-critical error during next pokemon fetch:", nextError)
            setNextPoke(null)
        }
    } else {
        setNextPoke(null)
    }

    // Fetch and set the PREVIOUS Pokémon
    if (pokeId > 1) {
        try {
            const prevPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId - 1}/`)
            if (prevPokemon.ok) {
                const prev = await prevPokemon.json()
                setPrevPoke(prev.name)
            } else {
                console.warn(`Could not find previous pokemon, status: ${prevPokemon.status}`)
                setPrevPoke(null)
            }
        } catch (prevError) {
            console.warn("Non-critical error during previous pokemon fetch:", prevError)
            setPrevPoke(null)
        }
    } else {
        setPrevPoke(null)
    }
    // (get more data from a different url using the poke id)
    // this fetch will give us a description of the pokemon
    try {
            const secondPokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`)
            if (!secondPokeApiResponse.ok) {
                // log the non-critical error but DO NOT throw or set global state.
                console.warn(`Second fetch failed, status: ${secondPokeApiResponse.status}. All good, default description will load`)
                // Return here to skip processing the response body if the fetch failed.
                return
            }
            const dataFromSecondApi = await secondPokeApiResponse.json()
            setSecondApiResponse(dataFromSecondApi)
        } catch (innerError) {
            // Catches network errors or issues parsing the JSON for the second fetch.
            console.warn("Non-critical error during second fetch:", innerError)
            // do NOTHING with the global setError here.
        }
    } catch (outerError) {
        console.error("Critical fetching error:", outerError)
        setError(`Data load error: ${outerError.message}`)
    } finally {
        setIsLoading(false)
    }
  }
  
  return (
    <>
    <HeadLights dataFromFirstApi={firstApiResponse} isLoading={isLoading} error={error}/>
    <ScreenContainerData dataFromFirstApi={firstApiResponse}  typeSprites={pokeTypeImg} dataFromSecondApi={secondApiResponse} isLoading={isLoading} error={error}/>
    <NextUp upNext={nextPoke} prev={prevPoke} triggerFetch={fetchPokemon}/>
    <SearchBar pokemonName={pokemonName} handleInputChange={handleInputChange} triggerFetch={fetchPokemon} isFetching={isLoading}/>
    </>
  )
}