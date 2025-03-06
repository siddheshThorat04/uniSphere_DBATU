import  express from 'express'
import { signup, login, logout,refreshToken } from "../controllers/authController.js"
import protectRoute from '../middleware/protectRoute.js'
const router = express.Router()
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/refreshToken',    protectRoute ,refreshToken)

export default router