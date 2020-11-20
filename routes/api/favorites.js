const router = require("express").Router();
const favoritesController = require("../../controllers/favoritesController");

router
  .route("/")
  .get(favoritesController.findAll)
  .post(favoritesController.create);

//Matches with "/api/favorites/uid"
router
  .route("/uid")
  .get(favoritesController.findByUserId)
  .put(favoritesController.update)
  .delete(favoritesController.remove);

//Matches with "/api/favorites/:id"
router
  .route("/:id")
  .get(favoritesController.findById)
  .put(favoritesController.remove)
  .delete(favoritesController.remove);

module.exports = router;
