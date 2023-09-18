// Imports
const router = require("express").Router();
const withAuth = require("../../utils/helpers");
const { Post, User, Comment } = require("../../models");


// Get All Posts by User
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ["username"] }]
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get One Post by User
router.get("/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["username"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });
      if (!postData) {
        res.status(404).json({ message: "No post found" });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create a new post
router.post("/", withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

// Edit Post
router.put("/:id", withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (!updatedPost) {
        res.status(404).json({ message: "No post found" });
        return;
      }
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete Page
router.delete("/:id", withAuth, async (req, res) => {
    try {
      await Comment.destroy({
        where: { post_id: req.params.id },
      });
  
      const deletedPost = await Post.destroy({
        where: { id: req.params.id },
      });
  
      if (!deletedPost) {
        res.status(404).json({ message: "No post found" });
        return;
      }
      res.status(200).json(deletedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;