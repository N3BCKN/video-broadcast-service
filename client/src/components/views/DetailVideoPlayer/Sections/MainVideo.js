import React, {useEffect, useState} from 'react'
import Subscription from './Subscription'
import {List, Avatar} from 'antd'
import moment from 'moment'
import Comments from './Comments'

function MainVideo(props){
	const {_id, title, filePath, description, writer, views,createdAt} = props.video

    const [CommentLists, setCommentLists] = useState([])

    useEffect(()=>{
    axios.post('/api/comment/getComments', videoVariable)
    .then(response => {
        if (response.data.success) {
            console.log('response.data.comments',response.data.comments)
            setCommentLists(response.data.comments)
        } else {
            alert('Failed to get video Info')
        }
    })

    },[])

    const updateComments = (comment) =>{
        setCommentLists(CommentLists.concat(comment))
    }

	return(

		<div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${filePath}`} controls></video>
            <List.Item
                actions={[<Subscription toUser={writer} fromUser={localStorage['userId']}  />]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={writer && writer.image} />}
                    title={<a href="https://ant.design">{title}</a>}
                    description={`${views} views. ${moment(createdAt).format("MMM Do YYYY")}`}
                />
                <div></div>
            </List.Item>
            <p>{description}</p>
            <Comments CommentLists={CommentLists} refreshFunction={updateComments}  postId={_id}/>
        </div>
	)
}

export default MainVideo