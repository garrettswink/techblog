// Imports
const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

// Route sync
router.use("/users", userRoutes);
router.use("/posts", postRoutes); 
router.use("/comments", commentRoutes);

// Export
module.exports = router;