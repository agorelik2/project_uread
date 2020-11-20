const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/").post(booksController.create).get(booksController.findAll);

// router
//   .route("/")
//   .post(booksController.create)
//   .get(booksController.findById)
//   .delete(booksController.remove);

//Matches with "/api/books/uid"
router
  .route("/uid")
  .get(booksController.findByUserId)
  .put(booksController.update)
  .delete(booksController.remove);

//Matches with "/api/books/user"
router
  .route("/user")
  .get(booksController.getUserBooks)
  .put(booksController.update)
  .delete(booksController.remove);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

//ALG /user (populate)
// router.get("/user", function (req, res) {
//   if (req.isAuthenticated()) {
//     booksController.getUserBooks(req, res);
//   } else {
//     res.status(401).send("Not authenticated");
//   }
//});

// router.get("/", function (req, res) {
//   if (req.isAuthenticated()) {
//     booksController.getUserBooks(req, res);
//   } else {
//     res.status(401).send("Not authenticated");
//   }
// });
module.exports = router;
