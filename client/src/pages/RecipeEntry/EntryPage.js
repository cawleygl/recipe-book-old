import React, { useState, useEffect } from "react";
import RecipeDisplay from "../../components/RecipeDisplay";
import DirectionEntry from "./DirectionEntry";
import IngredientEntry from "./IngredientEntry";
import TagsEntry from "./TagsEntry";


import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'


import API from "../../utils/API";
import Container from 'react-bootstrap/Container';

const Entry = () => {
  // Setting our component's initial state
  const [recipeName, setRecipeName] = useState("");
  const [recipeImg, setRecipeImg] = useState("");

  const [recipes, setRecipes] = useState([])
  const [formObject, setFormObject] = useState({})
  const [ingredientObject, setIngredientObject] = useState({})
  const [directionArr, setDirectionArr] = useState([])

  useEffect(() => {
    console.log("recipeName", recipeName);
  }, [recipeName])

  const handleRecipeName = (event) => {
    setRecipeName(event.target.value);
  };
  const handleRecipeImg = (event) => {
    setRecipeImg(event.target.value);
  };

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
      <h1 className="my-3">New Recipe</h1>

      {/* <RecipeDisplay
        recipes={[formObject]}
        ingredientToggle={true}
        directionToggle={true}
        nutritionToggle={true}
      /> */}

      <h4 className="my-3">Name</h4>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name"
          title="name"
          onChange={handleRecipeName}
          value={recipeName}
          aria-label="Text input recipe name"
          aria-describedby="recipe-name-entry"
        />
      </InputGroup>

      <h4 className="my-3">Image</h4>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Image Link"
          title="image"
          onChange={handleRecipeImg}
          value={recipeImg}
          aria-label="Text input recipe image"
          aria-describedby="recipe-image-entry"
        />
      </InputGroup>

      <IngredientEntry />

      <DirectionEntry />

      <TagsEntry />


      <Button className="my-3" variant="primary" size="lg" id="submit-button" onClick={() => (console.log("Submit"))}>
        Submit Recipe
      </Button>

    </Container>
  )
}
export default Entry;
