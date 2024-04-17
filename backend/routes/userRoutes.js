import express from 'express'
const router = express.Router()
import {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    getUsers,
    getUserByID,
    updateUser,
    updateUserProfile,
    deleteUser,
} from '../controllers/userController.js'

router.route('/').post(registerUser).get(getUsers)
router.post('/logout', logoutUser)
router.post('/login', authUser)
router.route('/proile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').delete(deleteUser).get(getUserByID).put(updateUser)

export default router
