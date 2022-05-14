import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { capitalizeName } from "../../utils/useTools";


const IngredientEntry = ({ ingredientArray, setIngredientArray }) => {
  const [currentAmount, setCurrentAmount] = useState("");
  const [currentUnit, setCurrentUnit] = useState("");
  const [currentName, setCurrentName] = useState("");

  const [currentIngredient, setCurrentIngredient] = useState(
    { amount: "", unit: "", name: "" }
  );

  const [currentItem, setCurrentItem] = useState(0);

  const addItem = (event) => {
    // Destructure and add empty value to ingredient array
    const arrayvalue = [...ingredientArray];
    arrayvalue.push("");
    setIngredientArray(arrayvalue);
    // Clear current amount, unit, name, and change current item
    setCurrentAmount("");
    setCurrentUnit("");
    setCurrentName("");

    setCurrentIngredient({ amount: "", unit: "", name: "" });
    setCurrentItem(ingredientArray.length)

  };

  const addToIngredientArray = (newIngredient) => {
    let arrayvalue = [...ingredientArray];
    arrayvalue[currentItem] = newIngredient;
    setIngredientArray(arrayvalue);
  };

  const updateCurrentAmount = (event) => {
    let amountInt = isNaN(parseInt(event.target.value)) === true || parseInt(event.target.value) < 1 ? null : parseInt(event.target.value);
    setCurrentAmount(amountInt);
    setCurrentIngredient({ amount: amountInt, unit: currentUnit, name: currentName });
    addToIngredientArray({ amount: amountInt, unit: currentUnit, name: currentName });
  };

  const updateCurrentUnit = (event) => {
    setCurrentUnit(event.target.value);
    setCurrentIngredient({ amount: currentAmount, unit: event.target.value, name: currentName });
    addToIngredientArray({ amount: currentAmount, unit: event.target.value, name: currentName });
  };

  const updateCurrentName = (event) => {
    setCurrentName(event.target.value);
    setCurrentIngredient({ amount: currentAmount, unit: currentUnit, name: event.target.value });
    addToIngredientArray({ amount: currentAmount, unit: currentUnit, name: event.target.value });
  };

  const deleteItem = (event) => {
    // Do not delete last item, only clear
    if (ingredientArray.length === 1) {
      setCurrentIngredient({ amount: "", unit: "", name: "" });
      setCurrentAmount("");
      setCurrentUnit("");
      setCurrentName("");
      setIngredientArray([""]);
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
    setCurrentAmount(arrayvalue[arrayvalue.length - 1].amount || "");
    setCurrentUnit(arrayvalue[arrayvalue.length - 1].unit || "");
    setCurrentName(arrayvalue[arrayvalue.length - 1].name || "");

  };

  const selectItemToEdit = (event) => {
    const index = event.target.closest('button').dataset.index;
    setCurrentItem(parseInt(index));
    // Destructure current state array
    const arrayvalue = [...ingredientArray];
    setCurrentIngredient(arrayvalue[index]);
    setCurrentAmount(arrayvalue[index].amount || "");
    setCurrentUnit(arrayvalue[index].unit || "");
    setCurrentName(arrayvalue[index].name || "");
  };

  return (
    <Row>
      <Form.Group className="mb-3">
        <Form.Label>Ingredients</Form.Label>
        <ul>
          {ingredientArray.map((ingredient, index) => (
            <div key={index}>
              <Row>
                <Col xs="auto" className='me-2'>
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
                    {ingredient.amount}{' '}
                    {capitalizeName(ingredient.unit)}{' '}
                    {capitalizeName(ingredient.name)}
                  </li>
                </Col>
              </Row>
            </div>
          ))}
        </ul>
        <InputGroup className="mb-1">
          <Form.Control
            as="input"
            type="number"
            min="1"
            placeholder="Amount"
            title="amount"
            onChange={updateCurrentAmount}
            value={currentAmount}
            aria-label="Text input ingredient amount"
            aria-describedby="recipe-ingredient-entry-amount"
          />
          <Form.Control
            as="input"
            type="text"
            placeholder="Unit"
            title="unit"
            onChange={updateCurrentUnit}
            value={currentUnit}
            aria-label="Text input recipe ingredient unit"
            aria-describedby="recipe-ingredient-entry-unit"
          />
          <Form.Control
            as="input"
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
        <Form.Text>Click the '+' icon to submit the current ingredient and add a new one.</Form.Text>

      </Form.Group>
    </Row>
  )
}
export default IngredientEntry
