import React, { useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const About = () => {
  const [recipe, setRecipe] = React.useState({});
  const [name, setName] = React.useState("");

  const [ingredientName, setIngredientName] = React.useState("");
  const [ingredientAmount, setIngredientAmount] = React.useState("");
  const [ingredientUnit, setIngredientUnit] = React.useState("");

  const [ingredients, setIngredients] = React.useState("");

  const [newDirection, setNewDirection] = React.useState("");
  const [directions, setDirections] = React.useState("");

  useEffect(() => {
    console.log("Recipe", recipe);
  }, [recipe]);

  const handleIngredientName = (event) => {
    setIngredientName(event.target.value);
  }
  const handleIngredientAmount = (event) => {
    setIngredientAmount(event.target.value);
  }
  const handleIngredientUnit = (event) => {
    setIngredientUnit(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleNewDirection = (event) => {
    setNewDirection(event.target.value);
  }

  const handleDirectionSubmit = () => {
    setDirections([...directions, newDirection]);
    setNewDirection("");
  }
  const handleIngredientSubmit = () => {
    setIngredients([...ingredients, { name: ingredientName, amount: ingredientAmount, unit: ingredientUnit }]);
    setIngredientName("");
    setIngredientAmount(0);
    setIngredientUnit(null);

  }

  const submitRecipe = () => {
    let recipeObj = {
      name: name,
      ingredients: ingredients,
      directions: directions
    }
    setRecipe(recipeObj);
  }

  return (
    <Container>
      <p>Recipe: {JSON.stringify(recipe, null, 2)}</p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Recipe Name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <p>Ingredient Array: {JSON.stringify(ingredients, null, 2)}</p>

        <InputGroup className="mb-3">
          <Dropdown as={ButtonGroup}>
            <Button
              variant="outline-primary"
              id="recipe-ingredients"
              onClick={handleIngredientSubmit}
            >
              Submit Ingredients
            </Button>
            {ingredients ?
              <>
                <Dropdown.Toggle split variant="outline-primary" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {ingredients.map((ingredient) => (
                    <Dropdown.Item href="#/action-1">Edit {ingredient.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </>
              : null}
          </Dropdown>
          <Row>
            <Col xs={2}>
              <Form.Control
                placeholder="Amount"
                value={ingredientAmount}
                onChange={handleIngredientAmount}
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                placeholder="Unit"
                value={ingredientUnit}
                onChange={handleIngredientUnit}
              />
            </Col>
            <Col xs={8}>
              <Form.Control
                placeholder="Ingredient"
                value={ingredientName}
                onChange={handleIngredientName}
              />
            </Col>
          </Row>
        </InputGroup>

        <p>Direction Array: {JSON.stringify(directions, null, 2)}</p>
        <InputGroup className="mb-3">
          <Dropdown as={ButtonGroup}>
            <Button
              variant="outline-primary"
              id="recipe-directions"
              onClick={handleDirectionSubmit}
            >
              Submit Direction
            </Button>
            {directions ?
              <>
                <Dropdown.Toggle split variant="outline-primary" id="dropdown-split-basic" />
                <Dropdown.Menu>
                  {directions.map((direction) => (
                    <Dropdown.Item href="#/action-1">Edit Step #{directions.indexOf(direction) + 1}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </>
              : null}
          </Dropdown>
          <Form.Control
            aria-label="Enter recipe directions with button addon"
            aria-describedby="recipe-directions"
            value={newDirection}
            onChange={handleNewDirection}
          />
        </InputGroup>


        <Button variant="primary" onClick={submitRecipe}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}
export default About
