import { useState } from "react";
import Game from './components/Game'

function App() {
  const [pantalla, setPantalla] = useState("home")
  return (
   <div className="bg-gradient-to-b from-[#BFA07A] to-[#D9C791]">
    {pantalla === "home" ? (
       <div className="relative flex items-center justify-center h-screen ">
     
       <div className="flex items-center justify-center h-screen ">
         <div className="text-center p-6 ">
           <h1 className="text-4xl text-[#5F2A1A] font-bold mb-4">
             Whack a Diglett
           </h1>
           <button
            onClick={()=>setPantalla('juego')}
             className=" w-80 h-12 py-2 bg-[#958E7C] text-[#0D0D0D] 
                       border-2 border-[#72573E]  rounded-lg hover:bg-[#C1A284]/70 transition text-xl"
           >
             Jugar
           </button>
         </div>
       </div>
 
     </div>
    ): (
     

      <Game setPantalla={setPantalla}/>
    )}
   </div>
  );
}

export default App;
