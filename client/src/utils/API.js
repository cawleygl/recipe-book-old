import axios from "axios";

const API = {
  // Gets all Recipes
  getRecipes: async function () {
    return await axios.get("/api/recipes/all");
  },
  // Gets all Recipes with a particular tag
  getRecipesByTag: async function (tagId) {
    return await axios.get("/api/recipes/tag/" + tagId);
  },
  // Gets the Recipe with the given id
  getRecipeById: async function (id) {
    return await axios.get("/api/recipes/id/" + id);
  },
  // Gets the Recipe with the given search term
  getRecipeBySearchTerm: async function (term) {
    return await axios.get("/api/recipes/search/" + term);
  },
  // Deletes the Recipe with the given id
  deleteRecipe: async function (id) {
    return await axios.delete("/api/recipes/id/" + id);
  },
  // Saves a Recipe to the database
  saveRecipe: async function (recipeData) {
    return await axios.post("/api/recipes/save", recipeData);
  },
  // Updates a Recipe in the database
  updateRecipe: async function (id, recipeData) {
    return await axios.put("/api/recipes/id/" + id, recipeData);
  },
  // Gets all Tags
  getTags: async function () {
    return await axios.get("/api/tags");
  },
  // Gets the Tag with the given id
  getTag: async function (id) {
    return await axios.get("/api/tags/" + id);
  },
  // Deletes the Tags with the given id
  deleteTag: async function (id) {
    return await axios.delete("/api/tags/" + id);
  },
  // Saves a Tag to the database
  saveTag: async function (tagData) {
    return await axios.post("/api/tags", tagData);
  },
  // Updates a Tag in the database
  updateTag: async function (id, tagData) {
    return await axios.put("/api/tags/" + id, tagData);
  }
};

export default API;

