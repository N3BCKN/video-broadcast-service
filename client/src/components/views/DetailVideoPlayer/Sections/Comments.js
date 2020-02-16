import React,{useState} from 'react'
import {Button, Input} from 'antd'
import { useSelector } from 'react-redux'

const {TextArea} = Input

function Comments(props){
	const user = useSelector(state => state.user)
	const [Comment, setComment] = useState('')

	const handleChange = (e) =>{
		setComment(e.currentTarget.value)
	}

	const handleSubmit = (e) =>{
		e.preventDefault()

		const commentData = {
			content: Comment,
			writer: user.userData.id,
			post: postId
		}

		axios.post('/api/comment/saveComment', commentData)
		.then(response => {
			if(response.data.success){
				props.updateComments(response.data.comment)
			}else{
				alert("comment couldn't be send")
			}
		})
	}

	return(
		<div>
			<br />
			<p> Replies </p>
			<hr />


            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                <React.Fragment>
                  <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                  <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                </React.Fragment>
                )
            ))}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
		</div>
	)
}


export default Comments