import React, { useState, useEffect } from "react";
import RecipeDisplay from "../components/RecipeDisplay";
import API from "../utils/API";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

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
import Toast from 'react-bootstrap/Toast'


const About = () => {
  function capitalizeName(name) {
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
  }
  const [currentDirection, setCurrentDirection] = useState("");
  const [directionArray, setDirectionArray] = useState([""]);
  const [currentStep, setCurrentStep] = useState(0);

  const isEditing = (index) => {
    if (currentStep === index) {
      return false;
    }
    return true;
  };

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


  const submitDirection = (event) => {
    console.log("submit")
  }

  useEffect(() => {
    console.log("directionArray", directionArray);
  }, [directionArray])
  useEffect(() => {
    console.log("currentStep", currentStep);
  }, [currentStep])



  return (
    <Container>
      <h4>Directions</h4>
      <ol>
        {directionArray.map((direction, index) => (
          <li key={index}>
            <Row>
              <InputGroup className="mb-2">
                <Col sm="11">
                  <Form.Control
                    type="text"
                    placeholder={`Step ${index + 1}`}
                    title={`step-${index + 1}`}
                    value={direction}
                    readOnly
                    plaintext={isEditing(index)}
                    aria-label="Text input recipe directions"
                    aria-describedby="recipe-directions"
                  />
                </Col>
                <Button variant="outline-primary" id="edit-button" data-index={index} onClick={selectStepToEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button variant="outline-danger" id="delete-button" data-index={index} onClick={deleteStep}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </InputGroup>
            </Row>

          </li>
        ))}
      </ol>
      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Directions"
            title="directions"
            onChange={updateCurrentDirection}
            value={currentDirection}
            aria-label="Text input recipe directions"
            aria-describedby="recipe-directions"
          />
          <Button variant="outline-primary" id="add-step-button" onClick={addStep}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>

        </InputGroup>
        <Button variant="primary" id="submit-button" onClick={submitDirection}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}
export default About
