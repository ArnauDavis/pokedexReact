import { useState } from 'react'
import PokedexFrame from './components/PokedexFrame'


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
