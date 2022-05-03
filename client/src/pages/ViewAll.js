import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Accordion from 'react-bootstrap/Accordion'
import Image from 'react-bootstrap/Image'

import { customBadge, capitalizeName } from "../utils/useTools";
import placeholder from '../assets/logo512.png'

function ViewAll() {
  let log = false;
  // Setting our component's initial state
  const [recipes, setRecipes] = useState([])
  const [tags, setTags] = useState([])

  // Load all recipes and tags on mount
  useEffect(() => {
    loadRecipes()
    loadTags()
  }, [])

  // Loads all recipes and sets them to recipes
  function loadRecipes() {
    API.getRecipes()
      .then(res => {
        log && console.log("res", res);
        setRecipes(res.data);
      }
      )
      .catch(err => console.log(err));
  };

  // Loads all tags and sets them to tags
  function loadTags() {
    API.getTags()
      .then(res => {
        log && console.log("res", res);
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
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            {recipes.map((recipe, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  <Row>
                    <Col xs='auto'>
                      <Link to={"/recipes/" + recipe._id}>
                        {capitalizeName(recipe.name)}
                      </Link>
                    </Col>
                    <Col>
                      {recipe.tags.length && tags.length ? recipe.tags.map((tagID, index) => (
                        <div key={index}>
                          {customBadge(
                            // Find tag name with matching ID from tags state variable
                            tags.find(tag => tag._id === tagID) ? capitalizeName(tags.find(tag => tag._id === tagID).name) : null,
                            index,
                            tagID,
                            // Find tag color with matching ID from tags state variable
                            tags.find(tag => tag._id === tagID) ? tags.find(tag => tag._id === tagID).tagColor : null,
                            // Find text color with matching ID from tags state variable
                            tags.find(tag => tag._id === tagID) ? tags.find(tag => tag._id === tagID).textColor : null,
                          )}
                        </div>
                      )) : null
                      }
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col xs={4}>
                      <Image thumbnail src={recipe.img ? recipe.img : placeholder} width="100%" />
                      <p>From: {recipe.owner}</p>
                    </Col>
                    <Col>
                      <h4>Ingredients</h4>
                      <ol>
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient.number} {ingredient.unit} {ingredient.name}</li>
                        ))}
                      </ol>
                      <h4>Directions</h4>
                      <ol>
                        {recipe.directions.map((direction, index) => (
                          <li key={index}>{direction}</li>
                        ))}
                      </ol>
                      {recipe.notes &&
                        <>
                          <h4>Notes</h4>
                          <p>{recipe.notes}</p>
                        </>
                      }
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}


export default ViewAll;
