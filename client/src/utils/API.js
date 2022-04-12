import axios from "axios";

const API = {
  // Gets all Recipes
  getRecipes: function() {
    return axios.get("/api/recipes");
  },
  // Gets the Recipe with the given id
  getRecipe: function(id) {
    return axios.get("/api/recipes/" + id);
  },
  // Deletes the Recipe with the given id
  deleteRecipe: function(id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a Recipe to the database
  saveRecipe: function(recipeData) {
    return axios.post("/api/recipes", recipeData);
  }
};

export default API;

