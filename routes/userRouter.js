/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const express = require('express')

const userRouter = express.Router();

const {
    isLoggedIn, 
    } = require('../authentication/authenticationHandler');

const {
    userProfile,
    getSearch,
    user,
    search,
    registerUser,
    updateProfile
} = require('../controllers/userController')

userRouter.post("/register", registerUser);

userRouter.get("/profile", isLoggedIn, userProfile);

userRouter.get('/searchuser',getSearch);

userRouter.get('/user/:userId',user)

userRouter.get('/search',search);

userRouter.post('/updateProfile/:userId',isLoggedIn,updateProfile);

module.exports = userRouter;
