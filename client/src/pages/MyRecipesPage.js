import React, { useState, useEffect, } from "react";

import AllInfoAccordion from '../components/RecipeViews/AllInfoAccordion'

import API from "../utils/API"


function MyRecipesPage() {
  let log = false;

  const [myRecipes, setMyRecipes] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // Load recipes from DB using IDs from localstorage and all tags from DB on mount
  useEffect(() => {
    loadTags();
    let recipes = JSON.parse(localStorage.getItem('MyRecipes'));
    log && console.log("recipes", recipes);
    if (recipes) buildRecipeArray(recipes);
  }, [])

  const buildRecipeArray = async (recipes) => {

    async function loadRecipeByID(recipeID) {
      try {
        let recipesRes = await API.getRecipeById(recipeID)
        log && console.log(`View My Recipes Page Recipes Response, #${recipeID}:`, recipesRes);
        return recipesRes.data;

      } catch (err) {
        // Handle Error Here
        console.error('RECIPES DB CALL -', err);
      }
    };
  
  
    let myRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      let recipe = await loadRecipeByID(recipes[i]);
      myRecipes.push(recipe);
    };

    setMyRecipes(myRecipes);
  };

  // Loads all tags and sets them to tags
  async function loadTags() {
    try {
      let tagsRes = await API.getTags()
      log && console.log("View My Recipes Page Tags Response:", tagsRes);
      setAllTags(tagsRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('TAGS DB CALL -', err);
    }
  };
if (myRecipes.length) {
  return (
    <>
      <h4 className="my-3">My Recipes</h4>
      <AllInfoAccordion recipes={myRecipes} allTags={allTags} />
      <h4 className="my-3">Shopping Cart</h4>
    </>
  );
} else {
  return (
    <>
      <h4 className="my-3">NO RECIPES</h4>
    </>
  );
}
}


export default MyRecipesPage;
