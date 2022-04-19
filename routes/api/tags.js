const router = require("express").Router();
const tagsController = require("../../controllers/tagsController");

// Matches with "/api/tags"
router.route("/")
  .get(tagsController.findAll)
  .post(tagsController.create);

// Matches with "/api/tags/:id"
router
  .route("/:id")
  .get(tagsController.findById)
  .put(tagsController.update)
  .delete(tagsController.remove);

module.exports = router;
