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

const [index, setIndex] = useState<number>(2)
const [addNewPhoto, setAddNewPhoto] = useState<IResult[]>([])

useEffect(()=>{
  setResult(getContextParam.media)
  
},[getContextParam.media])

  

  
const trick = {
  name: "Emmanuel",
  number: index
}

  const test = useCallback(() =>{
    setIndex(index + 1);
    //console.log("trick number from test", trick.number)
    
    fetch('http://localhost:8000/request', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trick)
    })
    .then(res => res.json())
    .then(data => {
      console.log("page number", data.page)
      setAddNewPhoto([...addNewPhoto, data.photos])

    })
  }, [index])
  console.log("data from useState", addNewPhoto);
  
  addNewPhoto.map((res, i) =>{
    console.log("res", res)
   
  })
 
  const IterateResult = useCallback(()=>{

   setIndex(index + 1);
  
    console.log("trick number", trick.number)
  },[index])

  
  
  
  return (
    <div className="app">


      <button onClick={IterateResult}>context result</button>
      <button onClick={test} style={{display: index === 10 ? 'none' : 'block'}}>test</button>

      <div className="api-result">

     { result.map((res, i): JSX.Element =>{
       console.log("res from result", res)
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
      <p style={{textAlign: 'center', fontSize: '2rem'}}>loading new api value</p>
      
      <div className="api-result">

      {(typeof addNewPhoto != "undefined") ? (
        addNewPhoto.map((res, i) =>{
          return(

          <div key={i} className="media">
            <div className="media-img">
            {/* <img src={res.src.} alt="!" /> */}
           </div>

          <div className="media-desc">
            <a href={res.photographer_url} target="_blank">Photographer: {res.photographer}</a>
          </div>

          </div>

          )
        })
        ) : ("")}
    </div>
    </div>
  );
}

export default Photos;

