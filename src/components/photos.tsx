import {useCallback, useContext, useEffect, useState} from 'react';
import {ProductContext} from '../context'
import '../App.css';


const tester = [
  [
    {
      name: "Juwon",
      age: 24,
    },
    {
      name: "Daniel",
      age: 12,
    }
  ],
  [
    {
      name: "Bolade",
      age: 28,
    },
    {
      name: "Sholarinde",
      age: 55,
    }
  ],
  [
    {
      name: "Precious",
      age: 22
    }, 
    {
      name: "lagbe",
      age: 44
    },
    {
      name: "Crux",
      age: 44
    },
    {
      name: "Ere",
      age: 99
    }
  ]
]

console.log("tester length", tester.length);

function Photos(){

const getContextParam = useContext(ProductContext)

interface IResult {
  photographer: string, 
  photographer_url: string, 
  src:{large: string}
}

interface IResultCombined{
  picture: { photographer: string, photographer_url: string, src:{large:string}}[]
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
    
    fetch('http://localhost:8000/request/photoquery', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(trick)
    })
    .then(res => res.json())
    .then(data => {
      console.log("page number", data.page)
      const shufflePhotos = data.photos.sort(()=> Math.random() * 0.5);
      setAddNewPhoto([...addNewPhoto, ...shufflePhotos])

    })
  }, [index])
  console.log("data from useState", addNewPhoto);
  addNewPhoto.map(phot => console.log(phot.photographer))
  
 

  
 
  const IterateResult = useCallback(()=>{

   setIndex(index + 1);
  
    console.log("trick number", trick.number)
  },[index])

  
  
  
  return (
    <div className="app">


      <button onClick={IterateResult}>context result</button>

      <div className="api-result">

     { result.map((res, i): JSX.Element =>{
      return(
        <div key={i} className="media">
          <div className="media-img">
            <img src={res.src.large} alt="!" />
           

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
        
          addNewPhoto.map((res, i) : JSX.Element =>{
            return(
  
            <div key={i} className="media">
              <div className="media-img">
              <img src={res.src.large} alt="!" />
             </div>
  
            <div className="media-desc">
              <a href={res.photographer_url} target="_blank">Photographer: {res.photographer}</a>
            </div>
  
            </div>
  
  )
})
        )  : ("")}
    </div>
    {/* button div */}
      <div className="more-photos">
        <button onClick={test} style={{display: index === 11 ? 'none' : 'block'}}>more photos</button>
      </div>
      
    </div>
  );
}

export default Photos;

