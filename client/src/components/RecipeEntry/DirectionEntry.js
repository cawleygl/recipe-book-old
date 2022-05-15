import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { handleEnterKeyDown } from "../../utils/useTools";

const DirectionEntry = ({ directionArray, setDirectionArray }) => {
  const [currentDirection, setCurrentDirection] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = (event) => {
    event.preventDefault();

    // Destructure
    const arrayvalue = [...directionArray];

    // If editing a step mid-array, switch to last step to submit
    if (currentStep + 1 !== arrayvalue.length) {
      setDirectionArray(arrayvalue);
      setCurrentStep(arrayvalue.length - 1)
      setCurrentDirection(arrayvalue[arrayvalue.length - 1])
      return;
    }

    arrayvalue.push("");
    setDirectionArray(arrayvalue);
    setCurrentStep(directionArray.length)
    setCurrentDirection("")
  };

  const updateCurrentDirection = (event) => {
    const value = event.target.value;
    // Destructure current state array
    let arrayvalue = [...directionArray];
    arrayvalue[currentStep] = value;
    setDirectionArray(arrayvalue);
    setCurrentDirection(event.target.value);
  };

  const deleteStep = (event) => {
    // Do not delete last step, only clear
    if (directionArray.length === 1) {
      setCurrentDirection("");
      setDirectionArray([""]);
      return;
    }
    const index = event.target.closest('button').dataset.index;
    // Destructure current state array
    const arrayvalue = [...directionArray];
    // Remove value at index
    arrayvalue.splice(index, 1);
    setDirectionArray(arrayvalue);

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
  };

  return (
    <Row>
      <Form className="mb-3" onSubmit={addStep}>
        <Form.Label>Directions</Form.Label>
        <ol>
          {directionArray.map((direction, index) => (
            <div key={index}>
              <Row>
                <Col xs="auto" className='me-3 ms-0 ps-0 pe-1'>
                  <ButtonGroup aria-label="direction tools">
                    <Button variant="outline-danger" id="delete-button" data-index={index} onClick={deleteStep}>
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                    <Button variant="outline-primary" id="edit-button" data-index={index} onClick={selectStepToEdit}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col>
                  <li>{direction}</li>
                </Col>
              </Row>
            </div>
          ))}
        </ol>
        <InputGroup className="mb-1">
          <Form.Control
            as="textarea"
            placeholder={`Step ${currentStep + 1}`}
            onChange={updateCurrentDirection}
            value={currentDirection}
            aria-label="Text input recipe directions"
            aria-describedby="recipe-direction-entry"
            onKeyDown={(event) => handleEnterKeyDown(event, addStep)}
          />
          <Button type="submit" variant="outline-primary" id="add-step-button" >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>
        <Form.Text>Click the '+' icon to submit the current step and add a new one.</Form.Text>
      </Form>
    </Row>
  )
}
export default DirectionEntry;
