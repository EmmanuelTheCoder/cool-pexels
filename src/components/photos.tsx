import {useCallback, useContext, useEffect, useState} from 'react';
import {ProductContext} from '../context'
import '../App.css';


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

  

  
const request = {
  name: "photo",
  number: index
}

  const test = useCallback(() =>{
    setIndex(index + 1);
    
    fetch('https://cool-pexels-server.herokuapp.com/request/mediaquery', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
    .then(res => res.json())
    .then(data => {
      const shufflePhotos = data.photos.sort(()=> Math.random() * 0.5);
      setAddNewPhoto([...addNewPhoto, ...shufflePhotos])

    })
  }, [index])
  
  
  
  return (
    <div className="app">

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



// testing out parameter mapping

// const tester = [
//   [
//     {
//       name: "Juwon",
//       age: 24,
//     },
//     {
//       name: "Daniel",
//       age: 12,
//     }
//   ],
//   [
//     {
//       name: "Bolade",
//       age: 28,
//     },
//     {
//       name: "Sholarinde",
//       age: 55,
//     }
//   ],
//   [
//     {
//       name: "Precious",
//       age: 22
//     }, 
//     {
//       name: "lagbe",
//       age: 44
//     },
//     {
//       name: "Crux",
//       age: 44
//     },
//     {
//       name: "Ere",
//       age: 99
//     }
//   ]
// ]


