"use client"
import Meet from "../models/meetModel.js"
import  User from "../models/userModel.js"
import  News from "../models/newsModel.js"
import  Event from "../models/eventModel.js"


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
        const { username, instagramLink } = req.body
        const user = req.user
        if (!user) {
            throw new Error("Please login first")
        }
        if (!instagramLink) {
            user.username = username
            user.instagramLink = user.instagramLink
        }
        if (username && instagramLink) {
            user.username = username
            user.instagramLink = instagramLink
        }
        if (!username && instagramLink) {
            user.instagramLink = instagramLink
        }
        await user.save()
        res.status(200).json({ message: "Profile Updated", user: user })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
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
