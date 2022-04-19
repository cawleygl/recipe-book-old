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
  },
    // Gets all Tags
  getTags: function() {
    return axios.get("/api/tags");
  },
  // Gets the Tag with the given id
  getTag: function(id) {
    return axios.get("/api/tags/" + id);
  },
  // Deletes the Tags with the given id
  deleteTag: function(id) {
    return axios.delete("/api/tags/" + id);
  },
  // Saves a Tag to the database
  saveTag: function(recipeData) {
    return axios.post("/api/tags", recipeData);
  }

};

export default API;

