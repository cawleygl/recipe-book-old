import React, { useState, useEffect } from "react";

import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import placeholder from '../assets/logo512.png'
import { Link } from "react-router-dom";



const RecipeDisplay = ({ recipes, ingredientToggle, directionToggle }) => {

  if (typeof (recipes) === "object") {
    console.log("RECIPES === OBJECT")
    return (
      <>
        <Accordion alwaysOpen={true}>
          {recipes ?
            recipes.map((recipe) => (
              <Accordion.Item eventKey={recipe._id} key={recipe._id} >
                <Accordion.Header>
                  <Link to={"/recipes/" + recipe._id}>
                    {recipe.name}
                  </Link>
                  {recipe.tags.map((tag) => (
                    <div key={recipe.tags.indexOf(tag)}>
                      <Badge pill bg="primary">{tag}</Badge>{' '}
                    </div>
                  ))}

                </Accordion.Header>
                <Accordion.Body>
                  <Container>
                    <Row>
                      <Col xs={12}>
                        <h3>{recipe.name}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2}>
                        <img src={recipe.image ? recipe.image : placeholder} alt={recipe.name} width='100%' ></img>
                      </Col>
                      <Col xs={10}>
                        {ingredientToggle ?
                          <>
                            <h4>Ingredients</h4>
                            <ol>
                              {recipe.ingredients.map((ingredient) => (
                                <li key={recipe.ingredients.indexOf(ingredient)}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                              ))}
                            </ol>
                          </>
                          : null}
                        {directionToggle ?
                          <>
                            <h4>Directions</h4>
                            <ol>
                              {recipe.directions.map((direction) => (
                                <li key={recipe.directions.indexOf(direction)}>{direction}</li>
                              ))}
                            </ol>
                          </>
                          : null}
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            ))
            : null}
        </Accordion>
      </>
    )

  } else {
    console.log("ONE RECIPE")
    return (
      <>
        <Accordion alwaysOpen={true}>
          <Accordion.Item eventKey={recipes._id} key={recipes._id} >

            <Accordion.Header>
              <Link to={"/recipes/" + recipes._id}>
                {recipes.name}
              </Link>
              {recipes.tags.map((tag) => (
                <div key={recipes.tags.indexOf(tag)}>
                  <Badge pill bg="primary">{tag}</Badge>{' '}
                </div>
              ))}

            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col xs={12}>
                    <h3>{recipes.name}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}>
                    <img src={recipes.image ? recipes.image : placeholder} alt={recipes.name} width='100%' ></img>
                  </Col>
                  <Col xs={10}>
                    {ingredientToggle ?
                      <>
                        <h4>Ingredients</h4>
                        <ol>
                          {recipes.ingredients.map((ingredient) => (
                            <li key={recipes.ingredients.indexOf(ingredient)}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                          ))}
                        </ol>
                      </>
                      : null}
                    {directionToggle ?
                      <>
                        <h4>Directions</h4>
                        <ol>
                          {recipes.directions.map((direction) => (
                            <li key={recipes.directions.indexOf(direction)}>{direction}</li>
                          ))}
                        </ol>
                      </>
                      : null}
                  </Col>
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </>
    )
  }
}

export default RecipeDisplay
