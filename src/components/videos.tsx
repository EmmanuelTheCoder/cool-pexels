import {useCallback, useContext, useEffect, useState} from 'react';
import {ProductContext, IVideo} from '../context';
import '../App.css';


const Videos = () =>{
    const videoFromContext = useContext(ProductContext);

    const [videoResult, setVideoResult] = useState<IVideo[]>([]);
    const [addNewVideo, setAddNewVideo] = useState<IVideo[]>([]);

    const [number, setNumber] = useState<number>(2);

    const request = {
        name: 'video',
        number: number
    }
    const fetchMoreVideos = useCallback(() =>{
        setNumber(number + 1);

        fetch('https://cool-pexels-server.herokuapp.com/request/mediaquery', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then(res => res.json())
        .then(data => {
            const shuffleVideos = data.videos.sort(()=> Math.random() * 0.5);
            setAddNewVideo([...addNewVideo, ...shuffleVideos])
        
    })
        .catch(err => console.error(err));
    }, [number])

 
    useEffect(() =>{
        setVideoResult(videoFromContext.video)
    }, [videoFromContext.video])

    return(
        <div>
            <div className="api-result">
                {videoResult.map((video, ind) =>{
                    const firstItem = video.video_files.slice(0,1);
                    return(
                        // video.video_files.map((res, i) =>{
                        //     return(
                        //         <div key={i}>
                        //             <video width="320" height="240" controls>
                        //                 <source src={res.link} type={res.file_type} />
                        //                 Your browser does not support the video tag
                        //             </video>
                        //         </div>
                        //     )
                        // }
                        
                        <div className="video-result" key={ind}>
                            {
                                firstItem.map((res, i) =>{
                                    return(
                                        <div key={i} className="key">
                                            <video width="320" height="240" controls>
                                            <source src={res.link} type={res.file_type} />
                                            Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    );
                                })
                            }
                        </div>
        
                    );
                })}
                {/* checking if this will stand */}
            </div>
                <div className="api-result">

                    {
                        addNewVideo.map((vid, ind) =>{
                            const firstVid = vid.video_files.slice(0, 1);
                            
                            return(
                                <div key={ind}>

                                    {
                                        firstVid.map((vid, ind) =>{
                                            return(
                                                <div key={ind} className="key">
                                                    <video width="320" height="240" controls>
                                                    <source src={vid.link} type={vid.file_type} />
                                                    Your browser does not support the video tag.
                                                    </video>
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                
                <div className="more-videos">
                    <button onClick={fetchMoreVideos} style={{display: number === 11 ? 'none' : 'block'}}>More videos</button>
                </div>
        </div>
    )
}

export default Videos;

