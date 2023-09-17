// Imports
const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

// Login
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  });
  
// Sign up
  router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("signup");
  });

// Render Homepage
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ["username"] }],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Render dashboard with all posts by user
router.get("/dashboard", withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ["username"] }],
      });

      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Render Post Page
router.get("/post/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["username"] },
                { model: Comment, include: [{ model: User, attributes: ["username"] }] },
            ],
        })
const post = postData.get({ plain: true });
res.render("post", {
    ...post, 
    logged_in: req.session.logged_in,
});
    } catch (err) {
        res.status(500).json(err);
    }
})

//Render New Post page
router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
      res.render("newpost");
      return;
    }
    res.redirect("/login");
  });

//Render Post Edit Page
router.get("/editpost/:id", async (req, res) => {
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
  
      const post = postData.get({ plain: true });
  
      res.render("editpost", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;