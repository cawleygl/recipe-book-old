import React, { useState, useEffect } from "react";
import API from "../../utils/API";

import DirectionEntry from "./DirectionEntry";
import IngredientEntry from "./IngredientEntry";
import TagsEntry from "./TagsEntry";
import ImageEntry from "./ImageEntry";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
      <h3 className="my-3">New Recipe</h3>
      <Form>
        <Row>
          <Col sm={8}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Name"
                onChange={(event) => setRecipeName(event.target.value)}
                aria-label="Text input recipe name"
                aria-describedby="recipe-name-entry"
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Source"
                onChange={(event) => setRecipeSource(event.target.value)}
                aria-label="Text input recipe source"
                aria-describedby="recipe-source-entry"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description"
            onChange={(event) => setRecipeDescription(event.target.value)}
            aria-label="Text input recipe description"
            aria-describedby="recipe-description-entry"
          />
          <Form.Text>Enter a basic description of this dish.</Form.Text>
        </Form.Group>

        <ImageEntry
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
        <TagsEntry
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Notes"
            onChange={(event) => setRecipeNotes(event.target.value)}
            aria-label="Text input recipe notes"
            aria-describedby="recipe-notes-entry"
          />
          <Form.Text>Add any additional information about this dish here.</Form.Text>

        </Form.Group>
        <Button className="my-3" variant="primary" size="lg" id="submit-button" onClick={handleFormSubmit}>
          Submit Recipe
        </Button>
      </Form>
    </Container>
  )
}
export default Entry;
