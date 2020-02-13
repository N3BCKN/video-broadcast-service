import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa"
import "./LandingPage.css"
import {Col, Typography, Row} from 'antd'
import axios from 'axios'
import VideoCard from '../Shared/VideoCard'

const {Title} = Typography

function LandingPage() {

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
    		<Title level={2} > Recomended </Title>
    		<hr/>
    		{RenderVideos}
    	</div>
    )
}

export default LandingPage
