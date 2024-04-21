/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const userModel = require("../models/userModel");
const factModel = require("../models/factModel");

// Function to upload a fact
async function uploadFact(req, res) {
  try {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const fact = await factModel.create({
      factText: req.body.factText,
      user: user._id,
    });

    await user.facts.push(fact._id);
    await user.save();
    return res.redirect("/users/profile");
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
}

// Function to explore facts
async function exploreFacts(req, res) {
  try {
    const facts = await factModel.find({}).populate("user");

    if (req.isAuthenticated()) {
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      return res.render("facts", { facts, req, user });
    } else {
      return res.render("facts", { facts, req });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

// Function to toggle like on a fact
async function toggleLikeFact(req, res) {
  const factId = req.params.factId;
  try {
    const fact = await factModel.findById(factId);
    const userLiked = fact.likes.includes(req.user._id);

    if (!userLiked) {
      fact.likes.push(req.user._id);
    } else {
      fact.likes.pull(req.user._id);
    }

    await fact.save();
    return res.redirect("back");
  } catch (error) {
    console.error(error);
    return res.redirect("back");
  }
}

// Function to delete a fact
async function deleteFact(req, res) {
  const factId = req.params.factId;

  try {
    await factModel.findByIdAndDelete(factId);
    return res.redirect("back");
  } catch (error) {
    console.error(error);
    return res.redirect("back");
  }
}

// Function to read a fact
async function readFact(req, res) {
  const factId = req.params.factId;

  try {
    const fact = await factModel
      .findById(factId)
      .populate("user")
      .populate("comments.user");
    if (req.isAuthenticated()) {
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      return res.render("fact", { fact, req, user });
    } else {
      return res.render("fact", { fact, req });
    }
  } catch (error) {
    console.error(error);
    return res.redirect("back");
  }
}

// Function to add a comment to a fact
async function factComments(req, res) {
  try {
    const factId = req.params.factId;
    const { commentText } = req.body;

    const fact = await factModel.findById(factId);

    if (!fact) {
      return res.status(404).json({ error: "Test not found" });
    }

    const newComment = {
      commentText,
      user: req.user._id,
      commentLikes: [],
    };

    fact.comments.push(newComment);
    await fact.save();

    res.redirect("back");
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
}

// Function to toggle like on a fact comment
async function likeFactComment(req, res) {
  try {
    const factId = req.query.factId;
    const commentId = req.params.commentId;

    const fact = await factModel.findById(factId);

    const comment = fact.comments.find((comment) => comment.id == commentId);

    const userLiked = comment.commentLikes.includes(req.user._id);

    if (!userLiked) {
      comment.commentLikes.push(req.user._id);
    } else {
      comment.commentLikes.pull(req.user._id);
    }

    await fact.save();
    res.redirect("back");
  } catch (error) {
    console.error(error);
  }
}

// Exporting the required functions
module.exports = {
  uploadFact,
  exploreFacts,
  deleteFact,
  readFact,
  factComments,
  likeFactComment,
  toggleLikeFact
};
