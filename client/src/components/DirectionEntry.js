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
  const [recipes, setRecipes] = useState([]);
  const [ingredientObject, setIngredientObject] = useState({});
  const [arrayValue, setArrayValue] = useState([""]);

  const updateArrayValue = (event) => {
    // Destructure current state array
    const arrayvalue = [...arrayValue];

    arrayvalue[parseInt(event.target.name)] = event.target.value;
    console.log(parseInt(event.target.name), arrayvalue.length)
    if (parseInt(event.target.name) === arrayvalue.length - 1) {
      arrayvalue.push(`Step {}`);
    }

    console.log(event.target.name)
    setArrayValue(arrayvalue);
  };

  const deleteArrayValue = (event) => {
    // Destructure current state array
    const arrayvalue = [...arrayValue];

    arrayvalue.splice(parseInt(event.target.name), 1)

    setArrayValue(arrayvalue);
  };

  useEffect(() => {
    console.log("arrayValue", arrayValue);
  }, [arrayValue])


  return (
    <Container>
      <p>{JSON.stringify(arrayValue, null, 2)}</p>
      <Form>
        <Form.Label>Directions</Form.Label>
        {arrayValue && arrayValue.map((direction, index) =>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Directions"
              title="directions"
              name={index}
              onChange={updateArrayValue}
              aria-label="Text input recipe directions"
              aria-describedby="recipe-directions"
            />
            <Button variant="outline-danger" id="delete-button" onClick={deleteArrayValue}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </InputGroup>
        )}
        <Button variant="primary" onClick={console.log("submit")}>
          Submit Recipe
        </Button>
      </Form>
    </Container>
  )
}
export default About
