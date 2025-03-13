import mongoose from "mongoose"
const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:string,
    },
    link:{
        type: String
    }


},{timestamps:true})  

const Project= mongoose.model('Project', projectSchema)
export default Project