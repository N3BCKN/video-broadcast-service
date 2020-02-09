import React, {useState} from 'react'
import {Form, Typography, Button, message, Input, Icon, Select} from 'antd'
import Dropzone from 'react-dropzone'

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


const VideoUpload = () =>{

	// useState() Hooks
    const [title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Music")

    const handleSubmit = (event) => {
		event.preventDefault()
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

	const handleDrop = (event) =>{
		console.log('droped')
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
	                    value={Description}
	                    />
                    </div>

                    <div className="upload-form">
                    	<label>Select Video Range</label> 
                    	<br/>
                    	<Select onChange={handleRange}>
		                    {Private.map((range, index) => (
		                        <Option key={index} value={range.label}>{range.label}</Option>
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