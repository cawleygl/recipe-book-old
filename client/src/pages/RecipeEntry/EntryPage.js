import React, { useState, useEffect } from "react";
import RecipeDisplay from "../../components/RecipeDisplay";
import DirectionEntry from "./DirectionEntry";
import IngredientEntry from "./IngredientEntry";
import Button from 'react-bootstrap/Button'


import API from "../../utils/API";
import Container from 'react-bootstrap/Container';

const Entry = () => {
  // Setting our component's initial state
  const [recipes, setRecipes] = useState([])
  const [formObject, setFormObject] = useState({})
  const [ingredientObject, setIngredientObject] = useState({})
  const [directionArr, setDirectionArr] = useState([])


  // Load all recipes and store them with setRecipes
  useEffect(() => {
    loadRecipes()
  }, [])

  useEffect(() => {
    console.log("formObject", formObject);
  }, [formObject])


  // Loads all recipes and sets them to recipes
  function loadRecipes() {
    API.getRecipes()
      .then(res =>
        setRecipes(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a recipe from the database with a given id, then reloads recipes from the db
  function deleteRecipe(id) {
    API.deleteRecipe(id)
      .then(res => loadRecipes())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleNameChange(event) {
    const { title, value } = event.target;
    setFormObject({ ...formObject, [title]: value })
  };

  // Sorts ingredients before updating component state
  function handleIngredientChange(event) {
    const { title, value } = event.target;
    setIngredientObject({ ...ingredientObject, [title]: value })
    setFormObject({ ...formObject, ingredients: [{ ...ingredientObject, [title]: value }] });
  };
  function handleIngredientSubmit(event) {
    const { title, value } = event.target;
    setIngredientObject({ ...ingredientObject, [title]: value })
    setFormObject({ ...formObject, ingredients: { ...ingredientObject, [title]: value } });
  };

  function handleDirectionChange(event) {
    const value = event.target.value;
    setFormObject({ ...formObject, directions: [value] })
  };
  function handleNewDirectionChange(event) {
    const value = event.target.value;
    console.log("NAME", event.target.name)
    setFormObject({ ...formObject, directions: [value] })
  };


  function handleTagChange(event) {
    const value = event.target.value;
    setFormObject({ ...formObject, tags: [value] })
  };



  function handleFormSubmit(event) {
    event.preventDefault();
    // if (formObject.title && formObject.author) {
    API.saveRecipe({
      title: formObject.title,
      author: formObject.author,
      synopsis: formObject.synopsis
    })
      .then(res => loadRecipes())
      .catch(err => console.log(err));
    // }
  };


  return (
    <Container>

      {/* <RecipeDisplay
        recipes={[formObject]}
        ingredientToggle={true}
        directionToggle={true}
        nutritionToggle={true}
      /> */}

      <IngredientEntry />
      <DirectionEntry />
      <Button className="my-3" variant="primary" size="lg" id="submit-button" onClick={() => (console.log("Submit"))}>
        Submit Recipe
      </Button>

    </Container>
  )
}
export default Entry;
