
import  College  from "../models/collegeModel.js"
import Meet  from "../models/meetModel.js"
import User  from "../models/userModel.js"
import News from "../models/newsModel.js"
import Event from "../models/eventModel.js"
 export const addCollege = async (req, res) => {
    try {

        
        const { name } = req.body
        const college = new College({ name })
        await college.save()

        res.status(200).json(college)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const addMeet = async (req, res) => {
    try {
        
        const { name, link } = req.body

        const meet = new Meet({ name, link })

        await meet.save()
        res.status(200).json(meet)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

export const getColleges = async (req, res) => {
    try {
        const colleges = await College.find()
        res.status(200).json({colleges:colleges })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export const deleteMeet = async (req, res) => {
    try {
        const meet = await Meet.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Meet Deleted"})     
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export const deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"News Deleted"})     
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export const getLeadboard = async (req, res) => {
    try {
        const leaboard=await User.find().sort({contributions:-1}).limit(3).populate("college")
        res.status(200).json(leaboard)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Event Deleted"})     
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


export const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        user.isBlocked=true;
        console.log(user)
        await user.save()
        res.status(200).json({message:"User Blocked"})     
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}