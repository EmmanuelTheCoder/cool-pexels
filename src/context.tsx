import { createContext, useState, useEffect } from 'react';

export interface IContext {
    media: {photographer: string, photographer_url: string, src:{large: string}}[]
    video: {video_files: {file_type: string, link: string}[]}[]
}
const initialState: IContext = {
   media: [{photographer: '', photographer_url: '', src:{large: ''}}],
   video: [{video_files: [{file_type: '', link: ''}]}]
}

export interface IVideo {
    video_files: {link: string, file_type: string}[]
  
}


const ProductContext = createContext<IContext>(initialState)

interface IGet {
    photographer: string,
    photographer_url: string
    src: {large: string}
}


const ContextController = ({children}: any) => {

   const [getPhoto, setGetPhoto] = useState<IGet[]>([])

   const [getVideo, setGetVideo] = useState<IVideo[]>([])
    
    
    const handlePhotoApiCall = () =>{
        fetch('https://cool-pexels-server.herokuapp.com/test')
        .then(res => res.json())
        .then(data => {
            const randomPhotos = data.photos.sort(()=> Math.random() - 0.5)
            setGetPhoto(randomPhotos)
    
        })
        .catch(err => console.error(err))
      }
      const handleVideoApiCall = () =>{
          fetch('https://cool-pexels-server.herokuapp.com/videos')
          .then(res => res.json())
          .then(data =>{
            setGetVideo(data.videos)
          })
          .catch(err => console.error(err));
      }
      useEffect(()=>{
        handlePhotoApiCall()
      },[])

      useEffect(()=>{
          handleVideoApiCall()
      },[])
    return(
            <ProductContext.Provider value={{
                media: getPhoto,
                video: getVideo
            }}>
                {children}

                
            </ProductContext.Provider>
    )
}
const ProductConsumer = ProductContext.Consumer
export {ContextController, ProductConsumer, ProductContext}