import {useCallback, useContext, useEffect, useState} from 'react';
import {ProductContext} from '../context'
import '../App.css';



function Photos(){

const getContextParam = useContext(ProductContext)

interface IResult {
  photographer: string, 
  photographer_url: string, 
  src:{original: string}
}
const [result, setResult ] = useState<IResult[]>([])

useEffect(()=>{
  setResult(getContextParam.media)
  
},[getContextParam.media])

  let index = 2

  const trick = {
    name: "Emmanuel",
    number: index
  }
 
  const IterateResult = useCallback(()=>{

    if(index <= 8){

      index++
    }else{
      index = 8
    }
  
    console.log("trick number", index)
  },[index])

    // fetch('http://localhost:8000/request', {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(trick)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log("data from the api", data)
      
    // })

//}
  
  
  return (
    <div className="app">


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

export default Photos;

