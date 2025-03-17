import  express from 'express'
// import  addCollege from '../controllers/adminController'
// import  addMeet from '../controllers/adminController'
// import  getColleges from '../controllers/adminController'
// import  deleteMeet from '../controllers/adminController'
// import  getLeadboard from '../controllers/adminController'
// import  deleteNews from '../controllers/adminController'
// import  deleteEvent from '../controllers/adminController'
import { addCollege, addMeet, getColleges, deleteMeet, getLeadboard, deleteNews, deleteEvent, blockUser } from '../controllers/adminController.js'
// const { getAdmins, getAdmin } = require('../controllers/adminController')

const router = express.Router()

router.post("/addCollege",addCollege)
router.post("/addMeet",addMeet)
router.get('/getClg', getColleges )
router.post('/deleteMeet/:id', deleteMeet )
router.post('/deleteNews/:id', deleteNews )
router.post('/deleteEvent/:id', deleteEvent )   
router.get('/getLeadboard', getLeadboard )
router.post('/block-user/:id', blockUser )

export default router