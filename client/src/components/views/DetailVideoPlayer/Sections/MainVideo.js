import React from 'react'
import {List, Avatar} from 'antd'
import moment from 'moment'

function MainVideo(props){
	const {title, filePath, description, writer, views,createdAt} = props.video
	return(
		<div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${filePath}`} controls></video>
            <List.Item
                actions={[]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={writer && writer.image} />}
                    title={<a href="https://ant.design">{title}</a>}
                    description={`${views} views. ${moment(createdAt).format("MMM Do YYYY")}`}
                />
                <div></div>
            </List.Item>
            <p>{description}</p>
        </div>
	)
}

export default MainVideo