import React from 'react'

function SlideVideo(props){

	const {_id, thumbnail, title, writer, views, duration} = props.video

	let minutes = Math.floor(duration / 60)
    let seconds = Math.floor(duration - minutes * 60)

	return(
		<div style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
            <div style={{ width:'80%', marginRight:'1rem' }}>
                <a href={`/video/${_id}`}  style={{ color:'gray' }}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${thumbnail}`} alt="thumbnail" />
                </a>
            </div>

            <div style={{ width:'90%' }}>
                <a href={`/video/${_id}`} style={{ color:'gray' }}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{title}  </span><br />
                    <span>{writer.name}</span><br />
                    <span>{views} views</span><br />
                    <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
	)
}

export default SlideVideo