const router = require("express").Router();
const reviewsController = require("../../controllers/reviewsController");

router.route("/").get(reviewsController.findAll).post(reviewsController.create);

//Matches with "/api/reviews/uid"
router
  .route("/uid")
  .get(reviewsController.findByUserId)
  .put(reviewsController.update)
  .delete(reviewsController.remove);

//Matches with "/api/reviews/:id"
router
  .route("/:id")
  .get(reviewsController.findByBookId)
  .post(reviewsController.create)
  .put(reviewsController.remove)
  .delete(reviewsController.remove);

module.exports = router;
