import mongoose from "mongoose"
const meetSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    }


},{timestamps:true})  

const Meet= mongoose.model('Meet', meetSchema)
export default Meet