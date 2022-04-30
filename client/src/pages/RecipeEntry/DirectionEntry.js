import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DirectionEntry = ({directionArray, handleRecipeDirections}) => {
  const [currentDirection, setCurrentDirection] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = (event) => {
    const arrayvalue = [...directionArray];
    console.log(event.target);
    arrayvalue.push("");
    handleRecipeDirections(arrayvalue);
    setCurrentStep(directionArray.length)
    setCurrentDirection("")
  };

  const updateCurrentDirection = (event) => {
    const value = event.target.value;
    // Destructure current state array
    let arrayvalue = [...directionArray];
    arrayvalue[currentStep] = value;
    handleRecipeDirections(arrayvalue);
    setCurrentDirection(event.target.value);
  };

  const deleteStep = (event) => {
    // Do not delete last step, only clear
    if (directionArray.length === 1) {
      setCurrentDirection("");
      handleRecipeDirections([""]);
      return;
    }
    const index = event.target.closest('button').dataset.index;
    // Destructure current state array
    const arrayvalue = [...directionArray];
    // Remove value at index
    arrayvalue.splice(index, 1);
    handleRecipeDirections(arrayvalue);

    // change current step to last step
    setCurrentStep(arrayvalue.length - 1)
    setCurrentDirection(arrayvalue[arrayvalue.length - 1]);
  };

  const selectStepToEdit = (event) => {
    const index = event.target.closest('button').dataset.index;
    setCurrentStep(parseInt(index));
    // Destructure current state array
    const arrayvalue = [...directionArray];
    setCurrentDirection(arrayvalue[index]);
    console.log(index);
  };

  useEffect(() => {
    console.log("directionArray", directionArray);
  }, [directionArray])
  useEffect(() => {
    console.log("currentStep", currentStep);
  }, [currentStep])

  return (
    <Form.Group className="mb-3">
      <Form.Label>Directions</Form.Label>
        <ol>
          {directionArray.map((direction, index) => (
            <div key={index}>
              <Row>
                <Col xs="auto">
                  <ButtonGroup aria-label="direction tools">
                    <Button variant="outline-danger" id="delete-button" data-index={index} onClick={deleteStep}>
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                    <Button variant="outline-primary" id="edit-button" data-index={index} onClick={selectStepToEdit}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col xs="auto">
                  <li>
                    {direction}
                  </li>
                </Col>
              </Row>
            </div>
          ))}
        </ol>
        <InputGroup className="mb-1">
          <Form.Control
            type="text"
            placeholder="Directions"
            title="directions"
            onChange={updateCurrentDirection}
            value={currentDirection}
            aria-label="Text input recipe directions"
            aria-describedby="recipe-direction-entry"
          />
          <Button variant="outline-primary" id="add-step-button" onClick={addStep}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>
        <Form.Text>Click the '+' icon to add a new step.</Form.Text>

    </Form.Group>
  )
}
export default DirectionEntry;
