const mongoose = require('mongoose')

const subscribeSchema = mongoose.Schema({
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })



const Subscription = mongoose.model('Subscription', subscribeSchema)

module.exports = { Subscription }