import React, { useEffect, useState } from 'react'
// import { FaCode } from "react-icons/fa"
import "../LandingPage/LandingPage.css"
import {Typography} from 'antd'
import axios from 'axios'
import VideoCard from '../Shared/VideoCard'

const {Title} = Typography

function SubscribePage() {

	const [Videos, setVideos] = useState([])
    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    const RenderVideos = Videos.map((video, index) => {
    	return <VideoCard key={index} video={video} />
    })


    return (
    	<div className="landing-page-main">
    		<Title level={2} >Your Subscribed Videos</Title>
    		<hr/>
    		{RenderVideos}
    	</div>
    )
}

export default SubscribePage
