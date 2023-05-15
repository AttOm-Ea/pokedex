import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Pokedex from "./pages/Pokedex"
import ProtectedAuth from "./components/auth/ProtectedAuth"
import PokemonId from "./pages/PokemonId"

function App() {

  return (
    <>
      <div className="w-full h-screen bg-red-900">
            <div className="w-full h-[11%] md:h-1/6 flex justify-between border border-black">
                <div className="w-3/12 h-30 lg:h-44 flex justify-center items-center lg:border -ml-1 bg-red-900 border-b-black border-r-black border-l-red-900 border-t-transparent rounded-br-full"> 
                  <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-blue-900 border-4 border-white"> </div>
                </div>
                <div className="h-full w-6/12 flex justify-center p-1"> <img className="h-full" src="./Img/pokeLogo.png" alt="logo" /> </div>
                <div className="w-3/12 flex justify-evenly items-center "> 
                    <div className="w-6 h-3 md:w-12 md:h-6 rounded-full bg-red-600 border-2 border-stone-300">  </div>
                    <div className="w-6 h-3 md:w-12 md:h-6 rounded-full bg-yellow-400 border-2 border-stone-300">  </div>
                    <div className="w-6 h-3 md:w-12 md:h-6 rounded-full bg-green-600 border-2 border-stone-300">  </div>
                </div>
            </div>
            {/* pt-16 */}
            <div className="w-full h-[89%] md:h-5/6 bg-white">
              <Routes>
                <Route path="/" element={<Home/>}/>  
                <Route element={<ProtectedAuth/>}>
                  <Route path="/Pokedex" element={<Pokedex/>} />
                  <Route path="/Pokedex/:id" element={<PokemonId/>} />
                </Route>
              </Routes>  
            </div>
        </div>
    </>
  )
}

export default App
