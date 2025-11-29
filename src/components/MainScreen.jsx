import {useState} from 'react'
import staticTv from "../assets/imgs/static.gif"
import SearchBar from "./SearchBar"
export default function MainScreen() {

  const [screen, setScreen] = useState(staticTv)
  
  return (
    <>
    <div className="h-80 mt-5 flex justify-center bg-white/60 backdrop-blur-md p-1 rounded-xl shadow-lg border-4 border-black shadow-[inset_0_0_0_4px_white]">
        <img className="w-full h-full object-fill rounded-l" src={screen} alt="pokeScreen" />
    </div>
    <SearchBar/>
    </>
  )
}