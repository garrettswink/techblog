// Imports
const homeRoutes = require("./home-routes");
const apiRoutes = require("./api")
const router = require("express").Router();

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;