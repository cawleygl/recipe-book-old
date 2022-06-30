import React, { useState, useEffect, } from "react";

import AllInfoAccordion from '../components/RecipeViews/AllInfoAccordion'

import API from "../utils/API"


function ViewAll() {
  let log = false;

  const [allRecipes, setAllRecipes] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // Load all recipes and tags on mount
  useEffect(() => {
    loadRecipes();
    loadTags();
  }, [])

  // Loads all recipes and sets them to recipes
  async function loadRecipes() {
    try {
      let recipesRes = await API.getRecipes()
      log && console.log("View All Recipes Page Recipes Response:", recipesRes);
      setAllRecipes(recipesRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('RECIPES DB CALL -', err);
    }
  };

  // Loads all tags and sets them to tags
  async function loadTags() {
    try {
      let tagsRes = await API.getTags()
      log && console.log("View All Recipes Page Tags Response:", tagsRes);
      setAllTags(tagsRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('TAGS DB CALL -', err);
    }
  };

  return (
    <>
      <h4 className="my-3">Recipe Views</h4>
        <AllInfoAccordion recipes={allRecipes} allTags={allTags} />
    </>
  );
}


export default ViewAll;
