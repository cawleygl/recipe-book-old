const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  source: String,
  description: { type: String, required: true },
  img: Object,
  ingredients: { type: Array, required: true },
  directions: { type: Array, required: true },
  tags: Array,
  notes: String
},
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
