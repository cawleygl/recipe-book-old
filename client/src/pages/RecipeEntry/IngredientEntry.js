import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

import { capitalizeName } from "../../utils/useTools";


const IngredientEntry = () => {
  const [currentNumber, setCurrentNumber] = useState("");
  const [currentUnit, setCurrentUnit] = useState("");
  const [currentName, setCurrentName] = useState("");

  const [currentIngredient, setCurrentIngredient] = useState(
    { number: "", unit: "", name: "" }
  );

  const [ingredientArray, setIngredientArray] = useState([""]);
  const [currentItem, setCurrentItem] = useState(0);

  const addItem = (event) => {
    // Destructure and add empty value to ingredient array
    const arrayvalue = [...ingredientArray];
    arrayvalue.push("");
    setIngredientArray(arrayvalue);
    // Clear current number, unit, name, and change current item
    setCurrentNumber("");
    setCurrentUnit("");
    setCurrentName("");

    setCurrentIngredient({ number: "", unit: "", name: "" });
    setCurrentItem(ingredientArray.length)

  };

  const addToIngredientArray = (newIngredient) => {
    let arrayvalue = [...ingredientArray];
    arrayvalue[currentItem] = newIngredient;
    setIngredientArray(arrayvalue);
  };

  const updateCurrentNumber = (event) => {
    setCurrentNumber(event.target.value);
    setCurrentIngredient({ number: event.target.value, unit: currentUnit, name: currentName });
    addToIngredientArray({ number: event.target.value, unit: currentUnit, name: currentName });
  };
  const updateCurrentUnit = (event) => {
    setCurrentUnit(event.target.value);
    setCurrentIngredient({ number: currentNumber, unit: event.target.value, name: currentName });
    addToIngredientArray({ number: currentNumber, unit: event.target.value, name: currentName });
  };

  const updateCurrentName = (event) => {
    setCurrentName(event.target.value);
    setCurrentIngredient({ number: currentNumber, unit: currentUnit, name: event.target.value });
    addToIngredientArray({ number: currentNumber, unit: currentUnit, name: event.target.value });
  };


  const deleteItem = (event) => {
    // Do not delete last item
    if (ingredientArray.length === 1) {
      return;
    }
    const index = event.target.closest('button').dataset.index;
    // Destructure current state array
    const arrayvalue = [...ingredientArray];
    // Remove value at index
    arrayvalue.splice(index, 1);
    setIngredientArray(arrayvalue);

    // change current item to last item
    setCurrentItem(arrayvalue.length - 1)
    setCurrentIngredient(arrayvalue[arrayvalue.length - 1]);
    setCurrentNumber(arrayvalue[arrayvalue.length - 1].number || "");
    setCurrentUnit(arrayvalue[arrayvalue.length - 1].unit || "");
    setCurrentName(arrayvalue[arrayvalue.length - 1].name || "");

  };

  const selectItemToEdit = (event) => {
    const index = event.target.closest('button').dataset.index;
    setCurrentItem(parseInt(index));
    // Destructure current state array
    const arrayvalue = [...ingredientArray];
    setCurrentIngredient(arrayvalue[index]);
    setCurrentNumber(arrayvalue[index].number || "");
    setCurrentUnit(arrayvalue[index].unit || "");
    setCurrentName(arrayvalue[index].name || "");
  };

  useEffect(() => {
    console.log("ingredientArray", ingredientArray);
  }, [ingredientArray])
  useEffect(() => {
    console.log("currentIngredient", currentIngredient);
  }, [currentIngredient])
  useEffect(() => {
    console.log("currentItem", currentItem);
  }, [currentItem])

  return (
    <>
      <h4 className="my-3">Ingredients</h4>
      <Form>
        <ol>
          {ingredientArray.map((ingredient, index) => (
            <Row>
              <Col xs="auto" md="2" lg="1">
                <ButtonGroup aria-label="ingredient tools">
                  <Button variant="outline-danger" id="delete-button" data-index={index} onClick={deleteItem}>
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                  <Button variant="outline-primary" id="edit-button" data-index={index} onClick={selectItemToEdit}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                </ButtonGroup>
              </Col>
              <Col xs="auto">
                <li key={index}>
                  {capitalizeName(ingredient.number)}{' '}
                  {capitalizeName(ingredient.unit)}{' '}
                  {capitalizeName(ingredient.name)}
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
            placeholder="Number"
            title="number"
            onChange={updateCurrentNumber}
            value={currentNumber}
            aria-label="Text input recipe ingredient number"
            aria-describedby="recipe-ingredient-entry-number"
          />
          <Form.Control
            type="text"
            placeholder="Unit"
            title="unit"
            onChange={updateCurrentUnit}
            value={currentUnit}
            aria-label="Text input recipe ingredient unit"
            aria-describedby="recipe-ingredient-entry-unit"
          />
          <Form.Control
            type="text"
            placeholder="Name"
            title="ingredient"
            onChange={updateCurrentName}
            value={currentName}
            aria-label="Text input recipe ingredient name"
            aria-describedby="recipe-ingredient-entry-name"
          />
          <Button variant="outline-primary" id="add-item-button" onClick={addItem}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>
      </Form>
    </>
  )
}
export default IngredientEntry