const router = require("express").Router();
const recipeRoutes = require("./recipes");
const tagRoutes = require("./tags");

// Book routes
router.use("/recipes", recipeRoutes);
router.use("/tags", tagRoutes);

module.exports = router;
