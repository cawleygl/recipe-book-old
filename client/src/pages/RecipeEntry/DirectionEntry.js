import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

import { capitalizeName } from "../../utils/useTools";

const About = () => {
  const [currentDirection, setCurrentDirection] = useState("");
  const [directionArray, setDirectionArray] = useState([""]);
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = (event) => {
    const arrayvalue = [...directionArray];
    console.log(event.target);
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
    console.log(index);
  };

  useEffect(() => {
    console.log("directionArray", directionArray);
  }, [directionArray])
  useEffect(() => {
    console.log("currentStep", currentStep);
  }, [currentStep])

  return (
    <>
      <h4 className="my-3">Directions</h4>
      <Form>
        <ol>
          {directionArray.map((direction, index) => (
            <Row>
              <Col xs="auto" md="2" lg="1">
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
                <li key={index}>
                  {capitalizeName(direction)}
                </li>
              </Col>
            </Row>
          ))}
        </ol>
      </Form>

      <Form>
        <InputGroup className="mb-3">
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
      </Form>
    </>
  )
}
export default About
