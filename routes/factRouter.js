/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const express = require('express');
const factRouter = express.Router();

const {
    isLoggedIn
} = require('../authentication/authenticationHandler');

const {
    uploadFact,
    exploreFacts,
    deleteFact,
    updateFact,
    readFact,
    factComments,
    likeFactComment,
    toggleLikeFact
} = require('../controllers/factController');

factRouter.get('/explorefacts', exploreFacts);

factRouter.get('/fact/:factId', readFact);

factRouter.post('/uploadfact', isLoggedIn, uploadFact);

factRouter.post('/likefact/:factId', isLoggedIn, toggleLikeFact);

factRouter.post('/deletefact/:factId', isLoggedIn, deleteFact);
factRouter.post('/updatefact/:factId', isLoggedIn, updateFact);

factRouter.post('/factcomments/:factId', isLoggedIn, factComments);

factRouter.post('/likefactcomment/:commentId', isLoggedIn, likeFactComment);

module.exports = factRouter;
