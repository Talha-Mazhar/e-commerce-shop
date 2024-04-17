import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

//@desc Auth user and get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    res.json('auth user')
})

//@desc register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    res.json('register user')
})

//@desc Logout user
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.json('logout user')
})

//@desc Logout user
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.json('get user')
})

//@desc Update user
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.json('update user')
})

//@desc Get users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.json('get users')
})

//@desc Get user by ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    res.json('get user by id')
})

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.json('delete user')
})

//@desc Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.json('update user')
})

export {
    authUser,
    logoutUser,
    registerUser,
    getUserProfile,
    getUsers,
    getUserByID,
    updateUser,
    updateUserProfile,
    deleteUser,
}
