import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SlideVideo from './SlideVideo'

function SlideVideos(props){

    const [SlideVideos, setSideVideos] = useState([])

    useEffect(()=>{
        axios.get('/api/video/getVideos')
        .then(response => {
        if (response.data.success) {
            setSideVideos(response.data.videos)
        }
        else {
            alert('Failed to get Videos')
        }
        })
    },[])

    const sideVideoItem = SlideVideos.map((video,index) =>{

        return <SlideVideo key={index} video={video} />
    })

	return(
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {sideVideoItem}
        </React.Fragment>
	)
}

export default SlideVideos