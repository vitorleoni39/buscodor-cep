/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./styles.css";

import api from "./servicers/api";

function App() {

  const [input, setinput] = useState() 
  
  const[cep, setCep] = useState({});

 async function handleSearch(){
    //01310930/json/

    if(input ===''){
      alert('Preencha o CEP!')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setinput("");
    }catch{
      alert("Ops erro ao buscar");
      setinput("")
    }

  }

  return (
    <div className="container">
      <h1  className="title">Buscador CEP</h1>
     
     <div className="containerinput">
      <input 
      type="text"
      placeholder="Digite seu CEP..."
      value={input}
      onChange={(Event)=> setinput(Event.target.value) }
      />

      <button className="buttonSearch" onClick={handleSearch}>
      Buscar🔍
      </button>
     </div>

   {Object.keys(cep).length > 0 && (
       <main className="main">
       <h2>CEP: {cep.cep}</h2>
 
       <span>{cep.logradouro}</span>
       <span>Complemento:{cep.complemento}</span>
       <span>{cep.bairro}</span>
       <span>{cep.localidade} - {cep.uf}</span>
     
      </main>
     ) }
    
  </div>

  );
}

export default App;
