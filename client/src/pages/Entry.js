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
  let log = false;

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
    log && console.log("Recipe", recipeObject);

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
      <Form>
        <BasicDetailEntry
          setRecipeName={setRecipeName}
          setRecipeSource={setRecipeSource}
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
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          setRecipeNotes={setRecipeNotes}
        />

      <Button type="submit" className="my-3" variant="primary" id="submit-button" onSubmit={handleFormSubmit}>
        Submit Recipe
      </Button>
    </Form>
    </Container >
  )
}
export default Entry;
