//building backend query string
const router = require("express").Router();
const userRoutes = require("./users");
const bookRoutes = require("./books");
const reviewRoutes = require("./reviews");
const favoriteRoutes = require("./favorites");

// backend routes
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/reviews", reviewRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;
