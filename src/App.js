import { useState } from "react";
import {runCypher, runDecypher, getCommonPairs, getPairs} from "./playfair";

function App() {
  const [plaintext, setPlainText] = useState("")
  const [cyphertext, setCypherText] = useState("")
  const [key, setKey] = useState("")
  const [output, setOutput] = useState("")

  
  const handlePlainChange = (e) => {
    setPlainText(e.target.value);
  }

  const handleCypherChange = (e) => {
    setCypherText(e.target.value);
  }

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  }


  const handleClickCypher = () =>{
    console.log("here");
    console.log(plaintext);
    console.log(key);
    let cyphered = runCypher(plaintext, key);
    setOutput(cyphered);
  }

  const handleClickGetPairs = () =>{
    let pairs = getPairs(plaintext, cyphertext);
    console.log(pairs);
    setOutput(pairs);
  }
  const handleClickGetCommonPairs = () =>{
    let pairs = getCommonPairs(plaintext, cyphertext);
    console.log(pairs);
    setOutput(pairs);
  }

  
const handleClickDecypher = () =>{
  let decyphered = runDecypher(cyphertext, key);
  setOutput(decyphered);
}




  return (
    <>
    <input
            type="text"
            value={plaintext}
            onChange={handlePlainChange}
            placeholder={"Plaintext"}
         />
<input
         type="text"
         value={cyphertext}
         onChange={handleCypherChange}
         placeholder={"Cyphertext"}
      />

<input
         type="text"
         value={key}
         onChange={handleKeyChange}
         placeholder={"Key"}
      />
      <textarea
         type="text"
         value={output}
         readOnly={true}
         placeholder={"Output"}
      />

      <button onClick={() => handleClickCypher()}> Cypher</button>
      <button onClick={() => handleClickGetPairs()}> Get Pairs</button>
      <button onClick={() => handleClickGetCommonPairs()}> Get Common Pairs</button>
      <button onClick={() => handleClickDecypher()}> Get Decypher</button>

      </>
  );
}

export default App;
