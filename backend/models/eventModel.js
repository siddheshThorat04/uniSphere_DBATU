import  mongoose from  "mongoose"

const eventSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    description: {
        type: String,   
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
    },
    isForAll:{
        type: Boolean,
        default: false
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})  

const Event=mongoose.model('Event', eventSchema)
export default Event