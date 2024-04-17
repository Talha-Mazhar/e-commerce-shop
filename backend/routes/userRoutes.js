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
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(admin, protect, getUsers)
router.post('/logout', logoutUser)
router.post('/login', authUser)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserByID)
    .put(protect, admin, updateUser)

export default router
