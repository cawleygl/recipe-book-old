import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import CloseButton from 'react-bootstrap/CloseButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

import { capitalizeName, handleEnterKeyDown, parseFractionAmount } from "../../hooks/useTools";

const IngredientEntry = ({ handleChange, values, errors, touched, addErrors, currentItem, handleSelect, handleAdd, handleDelete, handleToggle }) => {
  return (
    <>
      <Form.Group className='mb-3'>
        <Form.Label>Ingredients</Form.Label>
        <InputGroup data-name="ingredients" className="mb-1">
          <FloatingLabel
            controlId="floatingTextarea"
            label='Amount'
            style={{ width: '15%' }}
          >
            <Form.Control
              as='input'
              type="number"
              min='0'
              step="0.25"
              name="ingredientAmount"
              isInvalid={errors.ingredientName && touched.ingredientName}
              onChange={handleChange}
              value={values.ingredients[currentItem].ingredientAmount}
              onKeyDown={(event) => handleEnterKeyDown(event, handleChange)}
              aria-label="Text input ingredient amount"
              aria-describedby="recipe-ingredient-entry-amount"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label='Unit'
            style={{ width: '15%' }}
          >
            <Form.Control
              as="input"
              type="text"
              name="ingredientUnit"
              isInvalid={errors.ingredientName && touched.ingredientName}
              onChange={handleChange}
              value={values.ingredients[currentItem].ingredientUnit}
              onKeyDown={(event) => handleEnterKeyDown(event, handleChange)}
              aria-label="Text input recipe ingredient unit"
              aria-describedby="recipe-ingredient-entry-unit"
            />
          </FloatingLabel>
          <OverlayTrigger
            placement="top"
            trigger="focus"
            show={addErrors.ingredients}
            onToggle={(event) => handleToggle(event, 'ingredients')}
            overlay={
              <Popover id={`popover-positioned-top`}>
                <Popover.Header as="h3">{`Missing Info`}</Popover.Header>
                <Popover.Body>
                Ingredient Name (Did you put the name in another field?)
                </Popover.Body>
              </Popover>
            }
          >
            <FloatingLabel
              controlId="floatingTextarea"
              label='Name'
              style={{ width: 'calc(40% - 20px)' }}
            >
              <Form.Control
                as="input"
                type="text"
                name="ingredientName"
                isInvalid={errors.ingredientName && touched.ingredientName}
                onChange={handleChange}
                value={values.ingredients[currentItem].ingredientName}
                onKeyDown={(event) => handleEnterKeyDown(event, handleAdd)}
                aria-label="Text input recipe ingredient name"
                aria-describedby="recipe-ingredient-entry-name"
              />
            </FloatingLabel>
          </OverlayTrigger>
          <FloatingLabel
            controlId="floatingTextarea"
            label='Modifier'
            style={{ width: 'calc(30% - 20px)' }}
          >
            <Form.Control
              as="input"
              type="text"
              name="ingredientModifier"
              isInvalid={errors.ingredientName && touched.ingredientName}
              onChange={handleChange}
              value={values.ingredients[currentItem].ingredientModifier}
              onKeyDown={(event) => handleEnterKeyDown(event, handleAdd)}
              aria-label="Text input recipe ingredient modifier"
              aria-describedby="recipe-ingredient-entry-modifier"
            />
          </FloatingLabel>
          <Button onClick={handleAdd} name='ingredients' variant="outline-primary" id="add-item-button">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>
        <Form.Text>{errors.ingredientName && touched.ingredientName ? errors.ingredientName : null}</Form.Text>
      </Form.Group>

      <Table striped bordered hover style={{ width: '100%', wordBreak: 'break-word' }}>
        <thead>
          <tr>
            <th>Ingredients - Click to Edit</th>
          </tr>
        </thead>
        <tbody data-name="ingredients">
          {values.ingredients.map((ingredient, index) => (
            <tr key={index} data-index={index} onClick={handleSelect}>
              <td>
                <Row>
                  <Col className='btn-close-column' xs='auto'>
                    <CloseButton data-index={index} onClick={handleDelete} />
                  </Col>
                  <Col className='ms-2'>
                    {!ingredient.ingredientAmount && !ingredient.ingredientUnit && !ingredient.ingredientName ? '~' : parseFractionAmount(ingredient.ingredientAmount)}{' '}
                    {capitalizeName(ingredient.ingredientUnit)}{ingredient.ingredientUnit ? ' of ' : null}
                    {capitalizeName(ingredient.ingredientName)}{ingredient.ingredientModifier ? ', ' : null}
                    {capitalizeName(ingredient.ingredientModifier)}
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </>
  )
}
export default IngredientEntry
