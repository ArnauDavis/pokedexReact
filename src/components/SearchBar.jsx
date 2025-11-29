import { useState } from 'react'
import pokeball from "../assets/imgs/pokeball.png"

export default function SearchBar(){
    const [pokemonName, setPokemonName] = useState('')
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
    const handleInputChange = (event) => {
        setPokemonName(event.target.value.toLowerCase()); 
    }

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
      console.log(dataFromSecondApi.flavor_text_entries[0].flavor_text)
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
     <div>
      { firstApiResponse &&
      <div>
      <h3>Putting variables here</h3>
      <span>{pokeHeight/10} m</span>
      <br />
      <span>{pokemonNumber}</span>
      <br />
      <span>{pokeName}</span>
      <br />
      <span>{pokeType}</span>
      <br />
      <span><img src={pokePic} alt="pokePic" /></span>
      <br />
       <span><img src={pokeSecondPic} alt="pokePic" /></span>
      <br />
      <span>{pokeWeight/10} lbs.</span>
      <br />
      {secondApiResponse?  <span>{pokeDescription}</span> : <span>No data available</span> }
      </div>
              }
      {!firstApiResponse && <span>{error}</span>}
    </div> 

    <div className="mt-5 w-full max-w-md mx-auto font-mono">
      <div
        className="relative p-6 bg-black border-2 border-green-400 rounded-lg shadow-lg overflow-hidden"
      >
        

        <div
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-green-900/20 to-transparent"
        ></div>

        <label
          className="mb-3 text-green-400 text-sm tracking-wider flex items-center"
          htmlFor="pokesearch"
        >
          <span className="mr-2 text-green-600">➜</span>
          <span className="text-green-300 font-bold">POKÉ_SEARCH</span>
          <span className="ml-2 opacity-75 animate-pulse">▋</span>
        </label>

        <div className="relative">
          <input
            name="pokesearch"
            className="w-full bg-transparent text-green-300 text-base border-2 border-green-500 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600 placeholder-green-600/60 pr-10"
            placeholder="➤ ENTER NAME"
            value={pokemonName}
            type="text"
            onChange={handleInputChange}
          />

          <img
            src={pokeball}
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500"
          />
            <path
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          
        </div>

        <div className="mt-4 flex flex-col gap-2">
                <p className="text-xs text-green-500 opacity-80 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span><span className="text-red-400">Tip:</span> add -gmax</span>
                </p>
            <button className="fetch-button bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-2 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                onClick={fetchPokemon} 
                disabled={isLoading}
                >{isLoading ? 'Searching...' : `Search`}
                <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]">
                </span>
                
            </button>
        </div>

        <div className="absolute top-0 right-12 w-px h-4 bg-green-500/50"></div>
        <div className="absolute top-0 right-16 w-px h-6 bg-green-500/30"></div>
        <div className="absolute top-0 right-20 w-px h-2 bg-green-500/70"></div>

        <div className="absolute bottom-0 left-12 w-px h-4 bg-green-500/50"></div>
        <div className="absolute bottom-0 left-16 w-px h-6 bg-green-500/30"></div>
        <div className="absolute bottom-0 left-20 w-px h-2 bg-green-500/70"></div>
      </div>
      
    </div>
    
    </>
    )
}