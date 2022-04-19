import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { capitalizeName } from "../../utils/useTools";

const TagsEntry = () => {
  const [currentTag, setCurrentTag] = useState("");
  const [tagArray, setTagArray] = useState([""]);
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = (event) => {
    const arrayvalue = [...tagArray];
    console.log(event.target);
    arrayvalue.push("");
    setTagArray(arrayvalue);
    setCurrentStep(tagArray.length)
    setCurrentTag("")
  };

  const updateCurrentTag = (event) => {
    const value = event.target.value;
    // Destructure current state array
    let arrayvalue = [...tagArray];
    arrayvalue[currentStep] = value;
    setTagArray(arrayvalue);
    setCurrentTag(event.target.value);
  };

  const deleteStep = (event) => {
    // Do not delete last step
    if (tagArray.length === 1) {
      return;
    }
    const index = event.target.closest('button').dataset.index;
    // Destructure current state array
    const arrayvalue = [...tagArray];
    // Remove value at index
    arrayvalue.splice(index, 1);
    setTagArray(arrayvalue);

    // change current step to last step
    setCurrentStep(arrayvalue.length - 1)
    setCurrentTag(arrayvalue[arrayvalue.length - 1]);
  };

  const selectStepToEdit = (event) => {
    const index = event.target.closest('button').dataset.index;
    setCurrentStep(parseInt(index));
    // Destructure current state array
    const arrayvalue = [...tagArray];
    setCurrentTag(arrayvalue[index]);
    console.log(index);
  };

  useEffect(() => {
    console.log("tagArray", tagArray);
  }, [tagArray])
  useEffect(() => {
    console.log("currentStep", currentStep);
  }, [currentStep])

  return (
    <>
      <h4 className="my-3">Tags</h4>
      <Form>
        <ol>
          {tagArray.map((tag, index) => (
            <Row>
              <Col xs="auto" md="2" lg="1">
                <ButtonGroup aria-label="tag tools">
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
                  {capitalizeName(tag)}
                </li>
              </Col>
            </Row>
          ))}
        </ol>
      </Form>

      <Form>
        <InputGroup className="mb-3">
          <Form.Select
            type="text"
            placeholder="Tags"
            title="tags"
            onChange={updateCurrentTag}
            value={currentTag}
            aria-label="Text input recipe tags"
            aria-describedby="recipe-tag-entry"
          >
          </Form.Select>
          <Button variant="outline-primary" id="add-step-button" onClick={addStep}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>
      </Form>
    </>
  )
}
export default TagsEntry
