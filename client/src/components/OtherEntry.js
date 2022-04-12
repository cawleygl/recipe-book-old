import React, { useState, useEffect } from "react";
import RecipeDisplay from "../components/RecipeDisplay";
import API from "../utils/API";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import CloseButton from 'react-bootstrap/CloseButton'



const About = () => {
  function capitalizeName(name) {
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
  }
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
      <RecipeDisplay
        recipes={[formObject]}
        ingredientToggle={true}
        directionToggle={true}
        nutritionToggle={true}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Recipe Name"
            title="name"
            onChange={handleNameChange}
            aria-label="Text input name of recipe"
            aria-describedby="recipe-name"
          />
        </Form.Group>

        <Form.Label>Ingredients</Form.Label>
        <InputGroup className="mb-3">
          <Button
            variant="outline-primary"
            id="recipe-ingredients"
            onClick={handleIngredientSubmit}
          >
            Submit Ingredient
          </Button>
          <Row>
            <Col xs={2}>
              <Form.Control
                placeholder="Amount"
                title="amount"
                onChange={handleIngredientChange}
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                placeholder="Unit"
                title="unit"
                onChange={handleIngredientChange}
              />
            </Col>
            <Col xs={8}>
              <Form.Control
                placeholder="Ingredient"
                title="name"
                onChange={handleIngredientChange}
              />
            </Col>
          </Row>
        </InputGroup>

        {/* {submittedIngredients &&
          submittedIngredients.map((ingredient) => (
            <InputGroup className="mb-1">
              <Button
                variant="danger"
                id="edit-ingredients"
                value={submittedIngredients.indexOf(ingredient)}
                onClick={event => {
                  console.log(parseInt(event.currentTarget.value));

                  let newArr = submittedIngredients;
              
                  for (let i = 0; i < newArr.length; i++) {
                    if (i === parseInt(event.currentTarget.value)) {
                      newArr.splice(i, 1);
                    }
                  }
                  console.log("newArr", newArr);
                  setSubmittedIngredients([]);
                  setSubmittedIngredients(newArr);

                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Row>
                <Col xs={2}>
                  <Form.Control
                    placeholder="Amount"
                    defaultValue={ingredient.amount}
                    disabled
                  />
                </Col>
                <Col xs={2}>
                  <Form.Control
                    placeholder="Unit"
                    defaultValue={ingredient.unit}
                    disabled

                  />
                </Col>
                <Col xs={8}>
                  <Form.Control
                    placeholder="Ingredient"
                    defaultValue={ingredient.name}
                    disabled
                  />
                </Col>
              </Row>
            </InputGroup>
          ))
        } */}

        <Form.Label>Directions</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Directions"
            title="directions"
            onChange={handleDirectionChange}
            aria-label="Text input recipe directions"
            aria-describedby="recipe-directions"
          />
        </InputGroup>

        {formObject.directions && formObject.directions.map((direction, index) =>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Directions"
              title="directions"
              name={index}
              onChange={handleNewDirectionChange}
              aria-label="Text input recipe directions"
              aria-describedby="recipe-directions"
            />
          </InputGroup>
        )
        }

        <Form.Label>Tags</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Tags"
            title="tags"
            onChange={handleTagChange}
            aria-label="Text input recipe tags"
            aria-describedby="recipe-tags"
          />
        </InputGroup>

        {/* <Form.Group className="mb-3">
          {directions ?
            directions.map((direction) => (
              <Form.Control
                value={direction}
                disabled
              >
              </Form.Control>
            ))
            :
            <Form.Control
              placeholder={`Step 1`}
              disabled
            >
            </Form.Control>
          }
        </Form.Group> */}

        {/* <Button variant="primary" onClick={submitRecipe}>
          Submit Recipe
        </Button> */}
      </Form>
    </Container>
  )
}
export default About
