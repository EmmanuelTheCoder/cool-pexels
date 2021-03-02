import { createContext, useState, useEffect } from 'react';


export interface IState {
    media: {photographer: string, photographer_url: string, src:{large: string}}[]
}
const initialState: IState = {
   media: [{photographer: '', photographer_url: '', src:{large: ''}}]
}




const ProductContext = createContext<IState>(initialState)

interface IGet {
    photographer: string,
    photographer_url: string
    src: {large: string}
}


const ContextController = ({children}: any) => {

   const [getPhoto, setGetPhoto] = useState<IGet[]>([])
    //<PictureDetail[]>([])
    
    const handleApiCall = () =>{
        fetch('http://localhost:8000/test')
        .then(res => res.json())
        .then(data => {
            console.log("photo from context", data.photos)
            const randomPhotos = data.photos.sort(()=> Math.random() - 0.5)
            setGetPhoto(randomPhotos)
    
        })
        .catch(err => console.error(err))
      }
      useEffect(()=>{
        handleApiCall()
      },[])
    return(
        
            <ProductContext.Provider value={{
                media: getPhoto
            
            }}>
                {children}

                
            </ProductContext.Provider>
    )
}
const ProductConsumer = ProductContext.Consumer
export {ContextController, ProductConsumer, ProductContext}