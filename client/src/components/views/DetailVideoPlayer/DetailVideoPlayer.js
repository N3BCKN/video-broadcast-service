import React, {useEffect, useState} from 'react'
import {Row, Col} from 'antd'
import axios from 'axios'
import MainVideo from './Sections/MainVideo'
import SlideVideos from './Sections/SlideVideos'


function DetailVideoPlayer(props){

	const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])

    const videoRequest = {
        videoId: videoId
    }

    useEffect(() => {
        axios.post('/api/video/getVideo', videoRequest)
        .then(response => {
            if(response.data.success) {
                setVideo(response.data.video)
            } else {
                alert('Failed to get video Info')
            }
        })
    })

	return(
		<Row>
			<Col lg={16} xs={24}>
				<MainVideo video={Video}/>
			</Col>
			<Col lg={8} xs={24}>
				<SlideVideos />
			</Col>
		</Row>
	)
}

export default DetailVideoPlayer