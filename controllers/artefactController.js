/* This code is made by Anneshu Nag, Student ID: 2210994760 */
const userModel = require("../models/userModel");
const postModel = require("../models/artefactModel");

// Function to upload a post (artefact)
async function uploadPost(req, res) {
  try {
    if (!req.file) {
      return res.status(404).send("No file were uploaded. ");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      image: req.file.filename,
      imageText: req.body.filecaption,
      imageDescription:req.body.filedescription,
      user: user._id,
    });

    await user.posts.push(post._id);
    await user.save();
    return res.redirect("/users/profile");
  } catch (error) {
    return res.send(error);
  }
}


// Function to update a post
async function updatePost(req, res) {
  const postId = req.params.postId;

  try {
    // Find the post by ID and update it with the new data
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        imageText: req.body.filecaption,
        imageDescription: req.body.filedescription,
      },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    return res.redirect(`/users/profile`); // Redirect to the updated post or wherever you want
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}


// Function to explore artefacts
async function exploreArtefacts(req, res) {
  try {
    const posts = await postModel.find({}).populate("user");

    if (req.isAuthenticated()) {
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      return res.render("artefacts", { posts, req, user });
    } else {
      return res.render("artefacts", { posts, req });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

// Function to like a post
async function toggleLikePost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await postModel.findById(postId);
    const userLiked = post.likes.includes(req.user._id);

    if (!userLiked) {
      post.likes.push(req.user._id);
    } else {
      post.likes.pull(req.user._id);
    }

    await post.save();
    return res.redirect("back");
  } catch (error) {
    console.error(error);
    return res.redirect("back");
  }
}

// Function to delete a post
async function deletePost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await postModel.findByIdAndDelete(postId);
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return res.redirect("back");
  }
}

// Funciton to read a post
async function readPost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await postModel
      .findById(postId)
      .populate("user")
      .populate("comments.user");
    if (req.isAuthenticated()) {
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      return res.render("post", { post, req, user });
    } else {
      return res.render("post", { post, req });
    }
  } catch (error) {
    console.log(error);
    res.redirect("back");
  }
}

// Posting comments in a post
async function postComments(req, res) {
  try {
    const postId = req.params.postId;
    const { commentText } = req.body;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      commentText,
      user: req.user._id,
      commentLikes: [],
    };

    post.comments.push(newComment);
    await post.save();

    res.redirect("back");
  } catch (error) {
    console.error(error);
    res.redirect("back");
  }
}

// Function to like a comment
async function likecomment(req, res) {
  try {
    const postId = req.query.postId;
    const commentId = req.params.commentId;

    const post = await postModel.findById(postId);

    const comment = post.comments.find((comment) => comment.id == commentId);

    console.log(comment);

    const userLiked = comment.commentLikes.includes(req.user._id);
    console.log(userLiked);

    if (!userLiked) {
      comment.commentLikes.push(req.user._id);
    } else {
      comment.commentLikes.pull(req.user._id);
    }

    await post.save();
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
}

// Exporting the required functions
module.exports = {
  uploadPost,
  updatePost,
  exploreArtefacts,
  deletePost,
  readPost,
  postComments,
  likecomment,
  toggleLikePost
};
