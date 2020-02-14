import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../DetailVideoPlayer.css'

function Subscription(props){

	const {userFrom,userTo} = props

	const [Subscibers, setSubsribers] = useState(0)

	const onSubscribe = ( ) => {

        let subscribeVariables = {
                userTo : userTo,
                userFrom : userFrom
        }

        if(Subscribed) {
            //when we are already subscribed 
            axios.post('/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success){ 
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to unsubscribe')
                    }
                })

        } else {
            // when we are not subscribed yet
            
            axios.post('/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }

    useEffect(() => {

        const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubsribers(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
        })

    }, [])


	return(
		<div>
			<button onClick={onSubscribe} className="subscription-btn" >
				{Subscibers} {Subscribed ? 'Subscribed' : 'Subscribe'}
			</button>
		</div>
	)
}

export default Subscription