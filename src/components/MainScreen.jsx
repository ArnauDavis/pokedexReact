import {useState} from 'react'
import staticTv from "../assets/imgs/static.gif"
import SearchBar from "./SearchBar"
import ScreenContainerData from './ScreenContainerData'
export default function MainScreen() {

  const [pokemonName, setPokemonName] = useState('')
  const handleInputChange = (event) => {
        setPokemonName(event.target.value.toLowerCase()); 
    }
  const [screen, setScreen] = useState(staticTv)
  const [firstApiResponse, setfirstApiResponse] = useState(null)
  const [secondApiResponse, setSecondApiResponse] = useState(null)
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
    const fetchPokemon = async () => {
      // --- Step 1: Initialization ---
    setIsLoading(true)
    setError(null)
    setfirstApiResponse(null)
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
    const pokeId = dataFromFirstApi.id;
    // --- Step 3: SECOND FETCH (get more data from a different url using the poke id) ---
    // this fetch will give us a description of the pokemon
    const secondPokeApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`);
    
    if (!secondPokeApiResponse.ok) {
      throw new Error(`second fetch failed: ${secondPokeApiResponse.status}`);
    }
    const dataFromSecondApi = await secondPokeApiResponse.json();
    setSecondApiResponse(dataFromSecondApi) // Save the result of the second fetch
    setPokeDescription(dataFromSecondApi.flavor_text_entries[0].flavor_text)
  } catch (err) {
    // --- Step 4: Error Handling ---
    console.error("Sequential fetching error:", err);
    setError(`Data load error: ${err.message}`);
  } finally {
    // --- Step 5: Finalization ---
    setIsLoading(false);
  }
    }
  
  return (
    <>
    <ScreenContainerData dataFromFirstApi={firstApiResponse} dataFromSecondApi={secondApiResponse} isLoading={isLoading} error={error}/>
    
    
    <SearchBar pokemonName={pokemonName} handleInputChange={handleInputChange} triggerFetch={fetchPokemon} isFetching={isLoading}/>
    </>
  )
}