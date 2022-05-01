import React, { useState, useEffect } from "react";
import API from "../../utils/API";

import DirectionEntry from "./DirectionEntry";
import IngredientEntry from "./IngredientEntry";
import TagsEntry from "./TagsEntry";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

const Entry = () => {
  // Setting our component's initial state
  const [recipeObject, setRecipeObject] = useState({})

  const [recipeName, setRecipeName] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  const [ingredientArray, setIngredientArray] = useState([""]);
  const [directionArray, setDirectionArray] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipeNotes, setRecipeNotes] = useState("");

  const handleRecipeName = (event) => {
    setRecipeName(event.target.value);
  };
  const handleRecipeImg = (event) => {
    setRecipeImg(event.target.value);
  };
  const handleRecipeIngredients = (value) => {
    setIngredientArray(value);
  };
  const handleRecipeDirections = (value) => {
    setDirectionArray(value);
  };
  const handleSelectedTags = (value) => {
    setSelectedTags(value);
  };
  const handleRecipeNotes = (event) => {
    setRecipeNotes(event.target.value);
  };


  useEffect(() => {
    let newRecipe = {
      name: recipeName,
      img: recipeImg,
      ingredients: ingredientArray,
      directions: directionArray,
      tags: selectedTags,
      notes: recipeNotes
    };

    console.log("New Recipe", newRecipe);
    setRecipeObject(newRecipe);
    
  }, [recipeName, recipeImg, ingredientArray, directionArray, selectedTags, recipeNotes])


  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("recipeObject", recipeObject);

    if (recipeObject) {
    API.saveRecipe(recipeObject)
      .then(res => console.log("SAVED RECIPE"))
      .catch(err => console.log(err));
    }
  };


  return (
    <Container>
      <h4 className="my-3">New Recipe</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            title="name"
            onChange={handleRecipeName}
            value={recipeName}
            aria-label="Text input recipe name"
            aria-describedby="recipe-name-entry"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image Link"
            title="image"
            onChange={handleRecipeImg}
            value={recipeImg}
            aria-label="Text input recipe image"
            aria-describedby="recipe-image-entry"
          />
        </Form.Group>

        <IngredientEntry ingredientArray={ingredientArray} handleRecipeIngredients={handleRecipeIngredients} />
        <DirectionEntry directionArray={directionArray} handleRecipeDirections={handleRecipeDirections} />
        <TagsEntry selectedTags={selectedTags} handleSelectedTags={handleSelectedTags} />

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Notes"
            title="notes"
            onChange={handleRecipeNotes}
            value={recipeNotes}
            aria-label="Text input recipe notes"
            aria-describedby="recipe-notes-entry"
          />
        </Form.Group>

        <Button className="my-3" variant="primary" size="lg" id="submit-button" onClick={handleFormSubmit}>
          Submit Recipe
        </Button>
      </Form>

    </Container>
  )
}
export default Entry;
