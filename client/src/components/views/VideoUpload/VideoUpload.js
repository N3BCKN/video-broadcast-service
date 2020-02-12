import React, {useState} from 'react'
import {Form, Typography, Button, message, Input, Icon, Select} from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from "react-redux";

import './videoupload.css'

const {Title} = Typography
const {TextArea} = Input
const { Option } = Select

const Category = [
	{value: 0, label: "Music"},
	{value: 0, label: "News"},
	{value: 0, label: "Animals"},
	{value: 0, label: "Daily"},
	{value: 0, label: "Education and Healthcare"},
	{value: 0, label: "Video Games"}
]

const Private = [
	{value: 0, label: "Private"},
	{value: 1, label: "Public"}
]


const VideoUpload = (props) =>{

	const user = useSelector(state => state.user);
	// useState() Hooks
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [privacy, setPrivacy] = useState(0)
    const [filePath, setFilePath] = useState("")
    const [duration, setDuration] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [categories, setCategories] = useState("Music")

    const handleSubmit = (event) => {
		event.preventDefault()

		if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (title === "" || description === "" ||
            categories === "" || filePath === "" ||
            duration === "" || thumbnail === "") {
            return alert('Please first fill all the fields')
        }

		let videoData = {
			title: title,
			description: description,
			duration: duration,
			category: categories,
			privacy: privacy,
			filePath: filePath,
			thumbnail: thumbnail,
			writer: user.userData._id
		}

		console.log(videoData)

        axios.post('/api/video/uploadVideo', videoData)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    props.history.push('/')
                } else {
                    alert('Failed to upload video')
                }
            })
	}

	const handleTitle = (event) =>{
		setTitle(event.currentTarget.value)
	}

	const handleDescription = (event) =>{
		setDescription(event.currentTarget.value)
	}

	const handleRange = (value) =>{
		setPrivacy(value)
	}

	const handleCategory = (value) =>{
		setCategories(value)
	}

	const handleDrop = ( files ) =>{
        let formData = new FormData();
        let config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/video/fileupload', formData, config)
		.then(resp => {
			if(resp.data.success){
				
				// generate thumbnail
				let videoDetails = {
					filePath: resp.data.filePath,
                    fileName: resp.data.fileName
				}

				setFilePath(videoDetails.filePath)

				axios.post('/api/video/thumbnail', videoDetails)
                .then(response => {
                    if (response.data.success) {
                        setDuration(response.data.fileDuration)
                        setThumbnail(response.data.thumbsFilePath)
                    } else {
                        console.log('Failed to make the thumbnails');
                    }
                })

			}
			else{
				// TODO: handle errors
				console.log('error')
			}
		})
		.catch(err => {
			// TODO: handle errors
			console.log(err);
		})
	}
 
	return(
		<div className="upload-main">
			<div className="upload-header">
				<Title level={2}>Upload Your Video</Title>
			</div>
				<Form>
					<div className="upload-dropzone">
                    <Dropzone
              			onDrop={handleDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="upload-dropzone-frame" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>
					</div>

					<div className="upload-form">
						<label>Title</label>
						<Input
						onChange={handleTitle}
						value={title}
						/>
					</div>

					<div className="upload-form">
						<label>Description</label>
	                    <TextArea
	                    onChange={handleDescription}
	                    value={description}
	                    />
                    </div>

                    <div className="upload-form">
                    	<label>Select Video Range</label> 
                    	<br/>
                    	<Select onChange={handleRange}>
		                    {Private.map((range, index) => (
		                        <Option key={index} value={range.value}>{range.label}</Option>
		                    ))}
                    	</Select>
                    </div>

                    <div className="upload-form">
                    	<label>Select Video Category</label> 
                    	<br/>
                    	<Select onChange={handleCategory}>
		                    {Category.map((category, index) => (
		                        <Option key={index} value={category.label}>{category.label}</Option>
		                    ))}
                    	</Select>
                    </div>


		            <Button type="primary" size="large" onClick={handleSubmit}>
		                    Upload
		            </Button>

				</Form>
		</div>
	)
} 


export default VideoUpload;