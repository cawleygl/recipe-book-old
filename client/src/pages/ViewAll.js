import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Accordion from 'react-bootstrap/Accordion'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'

import { capitalizeName } from "../utils/useTools";
import placeholder from '../assets/logo512.png'

function ViewAll() {
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

  return (
    <Container fluid>
      <Row>
        <Col size="sm-12">
          <h4 className="my-3">All Recipes</h4>
          <p>{JSON.stringify(recipes, null, 2)}</p>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            {recipes.map((recipe, index) => (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <Row>
                    <Col xs='auto'>
                      <Link to={"/recipes/" + recipe._id}>
                        {capitalizeName(recipe.name)}
                      </Link>
                    </Col>
                    <Col>
                      {recipe.tags.map((tagID, index) => (
                          <Badge key={index} bg="primary">{tags.find(tag => tag._id === tagID) ? capitalizeName(tags.find(tag => tag._id === tagID).name) : null}</Badge>
                      ))}
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col xs={4}>
                      <Image thumbnail src={recipe.img ? recipe.img : placeholder} width="100%" />
                    </Col>
                    <Col>
                      <h4>Ingredients</h4>
                      <ol>
                        {recipe.ingredients.map((ingredient) => (
                          <li key={recipe.ingredients.indexOf(ingredient)}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                        ))}
                      </ol>
                      <h4>Directions</h4>
                      <ol>
                        {recipe.directions.map((direction) => (
                          <li key={recipe.directions.indexOf(direction)}>{direction}</li>
                        ))}
                      </ol>
                      <h4>Notes</h4>
                      <p>{recipe.notes}</p>
                    </Col>

                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          <h1 className="my-3">Tags</h1>
          <p>{JSON.stringify(tags, null, 2)}</p>
        </Col>
      </Row>
    </Container>
  );
}


export default ViewAll;
