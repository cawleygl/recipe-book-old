import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import API from "../utils/API";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

import RecipeDisplay from "../components/RecipeDisplay";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'

function Recipes() {
  // Setting our component's initial state
  const [recipes, setRecipes] = useState([])
  const [tags, setTags] = useState([])

  const [formObject, setFormObject] = useState({})

  // Load all recipes and store them with setRecipes
  useEffect(() => {
    loadRecipes()
    loadTags()
  }, [])

  // Loads all recipes and sets them to recipes
  function loadRecipes() {
    API.getRecipes()
      .then(res => {
        console.log("res", res);
        setRecipes(res.data)
      }
      )
      .catch(err => console.log(err));
  };

    // Loads all tags and sets them to tags
    function loadTags() {
      API.getTags()
        .then(res => {
          console.log("res", res);
          setTags(res.data)
        }
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
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveRecipe method to save the recipe data
  // Then reload Recipes from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveRecipe({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadRecipes())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="sm-12">
          <h1 className="my-3" >Recipes</h1>
          <p>{JSON.stringify(recipes, null, 2)}</p>
          <h1 className="my-3" >Tags</h1>
          <p>{JSON.stringify(tags, null, 2)}</p>

          {/* {recipes.length ? (
            <ListGroup>
              {recipes.map(recipe => (
                <ListGroup.Item key={recipe._id}>
                    <RecipeDisplay
                      recipes={recipe}
                      ingredientToggle={true}
                      directionToggle={true}
                      nutritionToggle={true}
                    />
                  <Button variant="outline-danger" id="delete-button" onClick={() => deleteRecipe(recipe._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <h3>No Results to Display</h3>
          )} */}
        </Col>
      </Row>
    </Container>
  );
}


export default Recipes;
