import axios from "axios";

const API = {
  // Gets all Recipes
  getRecipes: function () {
    return axios.get("/api/recipes/all");
  },
  // Gets all Recipes with a particular tag
  getRecipesByTag: function (tagId) {
    return axios.get("/api/recipes/tag/" + tagId);
  },
  // Gets the Recipe with the given id
  getRecipeById: function (id) {
    return axios.get("/api/recipes/id/" + id);
  },
  // Gets the Recipe with the given search term
  getRecipeBySearchTerm: function (term) {
    return axios.get("/api/recipes/search/" + term);
  },
  // Deletes the Recipe with the given id
  deleteRecipe: function (id) {
    return axios.delete("/api/recipes/id/" + id);
  },
  // Saves a Recipe to the database
  saveRecipe: function (recipeData) {
    return axios.post("/api/recipes/save", recipeData);
  },
  // Gets all Tags
  getTags: async function () {
    let res = await axios.get("/api/tags");
    return res.data;
  },
  // Gets the Tag with the given id
  getTag: async function (id) {
    let res = await axios.get("/api/tags/" + id);
    return res.data;
  },
  // Deletes the Tags with the given id
  deleteTag: async function (id) {
    let res = await axios.delete("/api/tags/" + id);
    return res.data;
  },
  // Saves a Tag to the database
  saveTag: async function (tagData) {
    let res = await axios.post("/api/tags", tagData);
    return res.data;
  },
  // Updates a Tag in the database
  updateTag: async function (id, tagData) {
    let res = await axios.put("/api/tags/" + id, tagData);
    return res.data;
  }
};

export default API;

