import { useState } from 'react'
import PokedexFrame from './components/pokedexFrame'
import MainScreen from './components/MainScreen'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex justify-center px-5">
    <PokedexFrame/>
    </div>
    </>
  )
}

export default App
