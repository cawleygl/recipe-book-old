import React, { useState, useEffect } from "react";
import API from "../../utils/API";

import DirectionEntry from "./DirectionEntry";
import IngredientEntry from "./IngredientEntry";
import TagsEntry from "./TagsEntry";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Entry = () => {
  let log = false;
  // Setting our component's initial state
  const [recipeObject, setRecipeObject] = useState({})

  const [recipeName, setRecipeName] = useState("");
  const [recipeOwner, setRecipeOwner] = useState("");
  const [recipeImg, setRecipeImg] = useState("");
  const [ingredientArray, setIngredientArray] = useState([""]);
  const [directionArray, setDirectionArray] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipeNotes, setRecipeNotes] = useState("");

  const handleRecipeName = (event) => {
    setRecipeName(event.target.value);
  };
  const handleRecipeOwner = (event) => {
    setRecipeOwner(event.target.value);
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
      owner: recipeOwner,
      img: recipeImg,
      ingredients: ingredientArray,
      directions: directionArray,
      tags: selectedTags,
      notes: recipeNotes
    };

    setRecipeObject(newRecipe);

  }, [recipeName, recipeOwner, recipeImg, ingredientArray, directionArray, selectedTags, recipeNotes])


  function handleFormSubmit(event) {
    event.preventDefault();

    if (recipeObject) {
      API.saveRecipe(recipeObject)
        .then(res => log && console.log("res", res))
        .catch(err => console.log(err));
    }
  };


  return (
    <Container>
      <h4 className="my-3">New Recipe</h4>
      <Form>
        <Row>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Name"
                onChange={handleRecipeName}
                aria-label="Text input recipe name"
                aria-describedby="recipe-name-entry"
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Owner"
                onChange={handleRecipeOwner}
                aria-label="Text input recipe owner"
                aria-describedby="recipe-owner-entry"
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="URL"
                onChange={handleRecipeImg}
                aria-label="Text input recipe image"
                aria-describedby="recipe-image-entry"
              />
            </Form.Group>
          </Col>
        </Row>

        <IngredientEntry ingredientArray={ingredientArray} handleRecipeIngredients={handleRecipeIngredients} />
        <DirectionEntry directionArray={directionArray} handleRecipeDirections={handleRecipeDirections} />
        <TagsEntry selectedTags={selectedTags} handleSelectedTags={handleSelectedTags} />

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Notes"
            onChange={handleRecipeNotes}
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
