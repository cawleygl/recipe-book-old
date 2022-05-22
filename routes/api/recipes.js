const router = require("express").Router();
const recipesController = require("../../controllers/recipesController");

// Matches with "/api/recipes/all"
router.route("/all")
  .get(recipesController.findAll);

// Matches with "/api/recipes/save"
router.route("/save")
  .post(recipesController.create);

// Matches with "/api/recipes/search/:term"
router.route("/search/:term")
  .get(recipesController.findBySearchTerm)

// Matches with "/api/recipes/tag/:tagId"
router.route("/tag/:tagId")
  .get(recipesController.findByTag)

// Matches with "/api/recipes/id/:id"
router.route("/id/:id")
  .get(recipesController.findById)
  .put(recipesController.update)
  .delete(recipesController.remove);

module.exports = router;
