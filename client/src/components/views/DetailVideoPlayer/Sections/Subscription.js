import React, {useEffect, useState} from 'react'
import axios from 'axios'
import '../DetailVideoPlayer.css'

function Subscription(props){

	const {userFrom,userTo} = props

	const [Subscibers, setSubscibers] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

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
                        setSubscibers(Subscibers - 1)
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
                        setSubscibers(Subscibers + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }

    useEffect(() => {

        const SubscibersVariables = { userTo: userTo, userFrom: userFrom }
        axios.post('/api/subscribe/subscribeNumber', SubscibersVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscibers(response.data.Subscibers)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        axios.post('/api/subscribe/subscribed', SubscibersVariables)
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