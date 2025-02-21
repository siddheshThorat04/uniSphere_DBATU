
import mongoose from "mongoose"
const newsSchema=new mongoose.Schema({
    college:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"College",
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    isForAll:{
        type:Boolean,
        default:false
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1d' }, 
    },
})


const News= mongoose.model("News",newsSchema)
export default News