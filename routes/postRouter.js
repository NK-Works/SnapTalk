/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const express = require('express');
const postRouter = express.Router();

const upload = require("../middlewares/multer");

const {
    isLoggedIn, 
    } = require('../authentication/authenticationHandler');

const {
    explorePosts,
    readPost,
    uploadPost,
    updatePost,
    toggleLikePost,
    deletePost,
    postComments,
    likecomment
} = require('../controllers/postController')

postRouter.get('/all-posts', explorePosts);

postRouter.get('/post/:postId', readPost);

postRouter.post("/upload", upload.single("file"), uploadPost);

postRouter.post('/like/:postId', isLoggedIn, toggleLikePost);

postRouter.post('/deletepost/:postId',isLoggedIn, deletePost);
postRouter.post('/updatepost/:postId',isLoggedIn, updatePost);

postRouter.post('/comments/:postId',isLoggedIn,postComments);

postRouter.post('/likecomment/:commentId',isLoggedIn,likecomment)

module.exports = postRouter;