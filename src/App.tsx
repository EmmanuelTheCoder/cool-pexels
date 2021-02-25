import {useCallback, useContext, useEffect, useState} from 'react';
import {ProductContext} from './context';
import Photos from './components/photos';
import loadable from '@loadable/component';
//import pMinDelay from 'p-min-delay';
import './App.css';

const PhotoComponent = loadable(()=> import ('./components/photos'))

function App(){
  return(
    <div className="app">
       <h1 className="app-name"> <span>cool</span> pexels</h1>
       <p className="app-name-source">...built on <a href="https://pexels.com">pexel.com's API</a></p>
        
        <PhotoComponent fallback={<div style={{textAlign: 'center'}}>loading...</div>}/>
    </div>
  )
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