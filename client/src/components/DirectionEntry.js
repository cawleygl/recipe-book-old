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
  const [steps, setSteps] = useState(1);

  const [ingredientObject, setIngredientObject] = useState({});
  const [arrayValue, setArrayValue] = useState([""]);


  const handleSubmit = (event) => {
    console.log("submit");
  };

  const updateSteps = (event) => {

    const steps = event.target.value;
    const operator = event.target.dataset.operator;

    console.log("Steps", steps, "Operator", operator)

    if (operator === "-") {
      if (steps <= 1) {
        setSteps(1)
      } else {
        setSteps(parseInt(steps) - 1)
      }
    } else if (operator === "+") {
      setSteps(parseInt(steps) + 1)
    } else {
      setSteps(steps)
    }
  }

  const updateArrayValue = (event) => {

    const value = event.target.value;
    const index = event.target.dataset.index;

    // Destructure current state array
    const arrayvalue = [...arrayValue];
    arrayvalue[parseInt(index)] = value;

    console.log(arrayvalue);
    setArrayValue(arrayvalue);
  };

  const deleteArrayValue = (event) => {
    const index = event.target.dataset.index;

    // Destructure current state array
    const arrayvalue = [...arrayValue];

    arrayvalue.splice(parseInt(index), 1)

    setArrayValue(arrayvalue);
  };

  useEffect(() => {
    console.log("arrayValue", arrayValue);
  }, [arrayValue])
  useEffect(() => {
    console.log("steps", steps);
  }, [steps])


  return (
    <Container>
      <p>{JSON.stringify(arrayValue, null, 2)}</p>
      <Form>
        <Form.Label>Directions</Form.Label>
        <Row>
          <Col xs={4} md={3} lg={2}>
            <InputGroup className="mb-3">
              <Button variant="outline-primary" id="minus-button" value={steps} data-operator={"-"} onClick={updateSteps}>
                -
              </Button>
              <Form.Control
                type="text"
                placeholder="Number of Steps"
                title="numberOfSteps"
                onChange={(event) => setSteps(event.target.value)}
                value={steps}
                aria-label="Text input number of steps"
                aria-describedby="recipe-number-of-steps"
              />
              <Button variant="outline-primary" id="plus-button" value={steps} data-operator={"+"} onClick={updateSteps}>
                +
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {arrayValue && arrayValue.map((direction, index) =>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Directions"
              title="directions"
              data-index={index}
              onChange={updateArrayValue}
              aria-label="Text input recipe directions"
              aria-describedby="recipe-directions"
            />
            <Button variant="outline-danger" id="delete-button" onClick={deleteArrayValue}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>

          </InputGroup>
        )}
        <Button id="submit-button" variant="primary" onClick={handleSubmit}>
          Submit Recipe
        </Button>
      </Form>
    </Container>
  )
}
export default About
