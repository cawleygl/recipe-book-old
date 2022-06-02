import React, { useState, useEffect } from "react";
import API from "../utils/API";

import BasicDetailEntry from "../components/RecipeEntry/BasicDetailEntry";
import DirectionEntry from "../components/RecipeEntry/DirectionEntry";
import IngredientEntry from "../components/RecipeEntry/IngredientEntry";
import ExtraDetailEntry from "../components/RecipeEntry/ExtraDetailEntry";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

const Entry = () => {
  let log = true;

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
      log && console.log("Entry Page Recipes Response:", recipesRes);
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
      log && console.log("Entry Page Tags Response:", tagsRes);
      setAllTags(tagsRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('TAGS DB CALL -', err);
    }
  };

  const [recipeObject, setRecipeObject] = useState({})

  const [recipeName, setRecipeName] = useState("");
  const [recipeSource, setRecipeSource] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeImgObject, setRecipeImgObject] = useState({ data: "", preview: "" });
  const [ingredientArray, setIngredientArray] = useState([""]);
  const [directionArray, setDirectionArray] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipeNotes, setRecipeNotes] = useState("");

  // Set Recipe object when variables change
  useEffect(() => {
    let newRecipe = {
      name: recipeName,
      source: recipeSource,
      description: recipeDescription,
      img: recipeImgObject,
      ingredients: ingredientArray,
      directions: directionArray,
      tags: selectedTags,
      notes: recipeNotes
    };

    setRecipeObject(newRecipe);
    log && console.log("Recipe", newRecipe);

  }, [recipeName, recipeSource, recipeDescription, recipeImgObject, ingredientArray, directionArray, selectedTags, recipeNotes])

  // Submit current recipe and save to db
  function handleFormSubmit(event) {
    event.preventDefault();
    log && console.log("Submit", recipeObject)

    if (recipeObject) {
      API.saveRecipe(recipeObject)
        .then(res => log && console.log("res", res))
        .catch(err => console.log(err));
    }
  };

  return (
    <Container>
      <h2 className="my-3">New Recipe</h2>
      <BasicDetailEntry
        recipeName={recipeName}
        setRecipeName={setRecipeName}

        recipeSource={recipeSource}
        setRecipeSource={setRecipeSource}

        recipeDescription={recipeDescription}
        setRecipeDescription={setRecipeDescription}

        recipeImgObject={recipeImgObject}
        setRecipeImgObject={setRecipeImgObject}
      />

      <IngredientEntry
        ingredientArray={ingredientArray}
        setIngredientArray={setIngredientArray}
      />

      <DirectionEntry
        directionArray={directionArray}
        setDirectionArray={setDirectionArray}
      />

      <ExtraDetailEntry
        allTags={allTags}
        setAllTags={setAllTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setRecipeNotes={setRecipeNotes}
      />

      <Button type="button" className="my-3" variant="primary" id="submit-recipe" onClick={handleFormSubmit}>
        Submit Recipe
      </Button>

    </Container >
  )
}
export default Entry;
