import { createContext, useState, useEffect } from 'react';


export interface IState {
    media: {photographer: string, photographer_url: string, src:{original: string}}[]
}
const initialState: IState = {
   media: [{photographer: '', photographer_url: '', src:{original: ''}}]
}




const ProductContext = createContext<IState>(initialState)

interface IGet {
    photographer: string,
    photographer_url: string
    src: {original: string}
}


const ContextController = ({children}: any) => {

   const [getPhoto, setGetPhoto] = useState<IGet[]>([])
    //<PictureDetail[]>([])
    
    const handleApiCall = () =>{
        fetch('http://localhost:8000/test')
        .then(res => res.json())
        .then(data => {
            const randomPhotos = data.photos.sort(()=> Math.random() - 0.5)
            setGetPhoto(randomPhotos)
            console.log(randomPhotos)
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