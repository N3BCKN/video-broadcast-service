import React from 'react'
import moment from 'moment'
import {Card, Avatar, Col} from 'antd'
import './styles.css'

const { Meta } = Card


function VideoCard(props){
	const {_id, thumbnail, views, title, duration, createdAt, writer} = props.video
	
	const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);

	return(
        <Col lg={5} md={6} xs={24} className="video-card">
            <div style={{ position: 'relative' }}>
                <a href={`/video/${_id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${thumbnail}`} />
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={writer.image} />
                }
                title={title}
            />
            <span>{writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {views} views</span>
            <span> {moment(createdAt).format("MMM Do YY")} </span>
        </Col>
	)
}

export default VideoCard