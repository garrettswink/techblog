// Imports
// Consider removing withAuth and Comment imports, as they aren't being used. Could I incorporate them?
const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Post, User, Comment } = require("../models");

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