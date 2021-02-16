import React, {useContext, useEffect, useState} from 'react';
import {ProductContext} from './context'
import './App.css';



function App(){

const getContextParam = useContext(ProductContext)
interface IResult {
  photographer: string, 
  photographer_url: string, 
  src:{original: string}
}
const [result, setResult ] = useState(getContextParam.media)

  
  const trick = {
    name: "Emmanuel",
    number: 2
  }
  const IterateResult = () =>{

    fetch('http://localhost:8000/request', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trick)
    })
    .then(res => res.json())
    .then(data => {
      console.log("data from the api", data)
      
     //console.log("combinedResult")
    })

  
}
  
  
  return (
    <div className="app">

      <h1 className="app-name"> <span>cool</span> pexels</h1>
      <p className="app-name-source">...built on <a href="https://pexels.com">pexel.com's API</a></p>

      <button onClick={IterateResult}>context result</button>

      <div className="api-result">
     { result.map((res, i): JSX.Element =>{
      return(
        <div key={i} className="media">
          <div className="media-img">
            <img src={res.src.original} alt="!" />
           

          </div>
          <div className="media-desc">
          
            <a href={res.photographer_url} target="_blank">Photographer: {res.photographer}</a>
          

          </div>
        </div>
      )
    })
  }
      </div>
    </div>
  );
}

export default App;






// const name: string = "Emmanuel";
// const age: number = 24;
// const combineTwo : string | number = name + age

// interface Person{
//   name: string,
//   age?: number,

// }
// interface PersonAg extends Person{
//   quoteArray: string[],
//   funcObj: () => void
// }

// const getPerson :Person = {
//   name: "Juwon",
  
// }
// const getExtendedPerson: PersonAg = {
//   name: "Juwon",
//   quoteArray: ["Emmanuel", "I like to build awesome stuff"],
//   funcObj: () =>{
//     console.log("it is working!")
//   }
  
// }

// function handleEdit <T>(arr: T[]){
//   console.log(arr);
// }
// handleEdit<string>(["talk"]);