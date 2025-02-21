import  mongoose from "mongoose"

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leadboard:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
})  

const College=mongoose.model('College', collegeSchema) 
export default College