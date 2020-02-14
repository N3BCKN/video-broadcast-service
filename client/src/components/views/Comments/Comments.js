import React,{useState} from 'react'
import {Button, Input} from 'antd'

const {TextArea} = Input

function Comments(){

	const [Comment, setComment] = useState('')

	const handleChange = (e) =>{
		setComment(e.currentTarget.value)
	}

	return(
		<div>
			<br />
			<p> Replies </p>
			<hr />
			<form style={{display: 'flex'}} onSubmit>
				<TextArea style={{width: '100%', borderRadius: "5px"}}
				onChange={handleChange}
				value={Comment}
				placeholder="Post your comment"
				/>
				<br />
				<Button style={{width: '20%', height: '52px'}}> Submit </Button>
			</form>
		</div>
	)
}


export default Comments