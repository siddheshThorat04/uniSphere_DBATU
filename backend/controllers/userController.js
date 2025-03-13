"use client"
import Meet from "../models/meetModel.js"
import  User from "../models/userModel.js"
import  News from "../models/newsModel.js"
import  Event from "../models/eventModel.js"
import Project from "../models/projectModel.js"

export const getMeet = async (req, res) => {
    try {
        const meet = await Meet.find()
        if (!meet) {
            throw new Error("Meet Not Found")
        }
        res.status(200).json({ meet })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

 export  const getNews = async (req, res) => {

    try {
        const user = req.user
        if (user.isAdmin) {
            const news = await News.find().populate('postedBy college')
            res.status(200).json({ message: "Latest Insights Fetched", news: news })
        } else {
            const news = await News.find({
                $or: [  
                    { college: user.college },
                    { isForAll: true }
                ]
            })
                .populate('postedBy college')

            res.status(200).json({ message: "Latest Insights Fetched", news: news })
        }
    } catch (error) {
        res.status(400).json({ error: error.message,message:"ERROR IN SERVER" })
    }
}

export const getEvents = async (req, res) => {
    try {
        const user = req.user
        const events = await Event.find({
            $or: [
                { college: user.college },
                { isForAll: true }
            ]
        })
            .populate('college postedBy')
        res.status(200).json({ message: "Events Fetched", events: events })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if username is already taken
        const userAvail = await User.findOne({ username: username });
        if (userAvail) {
            return res.status(400).json({ error: "Username Taken" });
        }

        const user = req.user; // Assuming req.user is set from auth middleware
        if (!user) {
            return res.status(500).json({ error: "User Not Found" });
        }

        // Update user details
        user.username = username;
        await user.save();

        res.status(200).json({ message: "Profile Updated", user });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).populate("college")
        if (!user) {
            throw new Error("User Not Found")
        }
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
export const crateProject=async(req,res)=>{
    try {
        const user=req.user;
        const {title,description}=req.body
        const project=new Project({title,description,postedBy:user._id})
        await project.save()
        res.status(200).json({project})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
export const getProjects=async(req,res)=>{
    try {
        const projects=await Project.find().populate("postedBy")
        res.status(200).json({projects})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}