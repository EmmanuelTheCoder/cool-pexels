import loadable from '@loadable/component';
//import pMinDelay from 'p-min-delay';
import Videos from './components/videos';
import './App.css';    
import { useState } from 'react';

const PhotoComponent = loadable(()=> import ('./components/photos'))

function App(){

  const [toggle, setToggle] = useState<boolean>(true)
  const photoToggle = () =>{

  }

  const videoToggle = () =>{
    
  }
  return(
    <div className="app">
       <h1 className="app-name"> <span>cool</span> pexels</h1>
       <p className="app-name-source">...built on <a href="https://pexels.com">pexel.com's API</a></p>
        
        <div className="component-renderer">
          <h2 onClick={()=> setToggle(true)} style={{textDecoration: toggle ? 'underline' : 'none', textDecorationColor: toggle ? 'blue' : 'none'}}>Photos</h2>
          <h2 onClick={()=> setToggle(false)} style={{textDecoration: !toggle ? 'underline': 'none', textDecorationColor: !toggle ? 'blue' : 'none'}}>Videos</h2>
        </div>
        
        <div>
            {toggle ? <PhotoComponent /> : <Videos />}
        </div>

        
        <div className="footer">
          <footer>
            <p>Created by loyaltysamuel001@gmail.com</p>
          </footer>
        </div>
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