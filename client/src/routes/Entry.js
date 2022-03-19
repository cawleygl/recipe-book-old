import React, { useEffect } from "react";
import RecipeDisplay from "../components/RecipeDisplay";

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

  const [recipe, setRecipe] = React.useState({});
  const [name, setName] = React.useState("");

  const [ingredientName, setIngredientName] = React.useState("");
  const [ingredientAmount, setIngredientAmount] = React.useState("");
  const [ingredientUnit, setIngredientUnit] = React.useState("");

  const [newIngredient, setNewIngredient] = React.useState({});

  const [submittedIngredients, setSubmittedIngredients] = React.useState("");

  const [newDirection, setNewDirection] = React.useState("");
  const [directions, setDirections] = React.useState("");

  const [newTag, setNewTag] = React.useState("");
  const [tags, setTags] = React.useState(["vegan"]);

  const [image, setImage] = React.useState("");

  useEffect(() => {
    console.log("Recipe", recipe);
  }, [recipe]);

  useEffect(() => {
    console.log("submittedIngredients", submittedIngredients);
  }, [submittedIngredients]);

  const handleIngredientSubmit = () => {
    setSubmittedIngredients([...submittedIngredients, newIngredient]);
    setNewIngredient({});
    setIngredientName("");
    setIngredientAmount("");
    setIngredientUnit("");

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

  const submitRecipe = () => {
    let recipeObj = {
      name: name,
      ingredients: submittedIngredients,
      directions: directions
    }
    setRecipe(recipeObj);
    setName("");
    setSubmittedIngredients("");
    setDirections("");

  }

  return (
    <Container>
      <RecipeDisplay
        recipes={[
          {
            name: name || ["New Recipe"],
            image: image || "",
            ingredients: [...submittedIngredients, newIngredient] || [""],
            directions: directions || [""],
            tags: tags || [""]
          },
        ]}
        ingredientToggle={true}
        directionToggle={true}
        nutritionToggle={true}
      />


      <p>{JSON.stringify(recipe, null, 2)}</p>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Recipe Name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Label>Ingredients</Form.Label>
        <InputGroup className="mb-3">
          <Button
            variant="outline-primary"
            id="recipe-ingredients"
            onClick={handleIngredientSubmit}
          >
            Submit Ingredient
          </Button>
          <Row>
            <Col xs={2}>
              <Form.Control
                placeholder="Amount"
                value={ingredientAmount}
                onChange={event => {
                  setIngredientAmount(event.target.value);
                  setNewIngredient({ name: ingredientName, amount: event.target.value, unit: ingredientUnit });
                }}
              />
            </Col>
            <Col xs={2}>
              <Form.Control
                placeholder="Unit"
                value={ingredientUnit}
                onChange={event => {
                  setIngredientUnit(event.target.value);
                  setNewIngredient({ name: ingredientName, amount: ingredientAmount, unit: event.target.value });
                }}
              />
            </Col>
            <Col xs={8}>
              <Form.Control
                placeholder="Ingredient"
                value={ingredientName}
                onChange={event => {
                  setIngredientName(event.target.value);
                  setNewIngredient({ name: event.target.value, amount: ingredientAmount, unit: ingredientUnit });
                }}
              />
            </Col>
          </Row>
        </InputGroup>
        {submittedIngredients &&
          submittedIngredients.map((ingredient) => (
            <InputGroup className="mb-1">
              <Button
                variant="danger"
                id="edit-ingredients"
                value={submittedIngredients.indexOf(ingredient)}
                onClick={event => {
                  console.log(parseInt(event.currentTarget.value));

                  let newArr = submittedIngredients;
              
                  for (let i = 0; i < newArr.length; i++) {
                    if (i === parseInt(event.currentTarget.value)) {
                      newArr.splice(i, 1);
                    }
                  }
                  console.log("newArr", newArr);
                  setSubmittedIngredients([]);
                  setSubmittedIngredients(newArr);

                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <Row>
                <Col xs={2}>
                  <Form.Control
                    placeholder="Amount"
                    defaultValue={ingredient.amount}
                    disabled
                  />
                </Col>
                <Col xs={2}>
                  <Form.Control
                    placeholder="Unit"
                    defaultValue={ingredient.unit}
                    disabled

                  />
                </Col>
                <Col xs={8}>
                  <Form.Control
                    placeholder="Ingredient"
                    defaultValue={ingredient.name}
                    disabled
                  />
                </Col>
              </Row>
            </InputGroup>
          ))
        }

        <p>{JSON.stringify(submittedIngredients, null, 2)}</p>

        {/* <Form.Label>Directions</Form.Label>
        <InputGroup className="mb-3">
          <Button
            variant="outline-primary"
            id="recipe-directions"
            onClick={handleDirectionSubmit}
          >
            Submit Direction
          </Button>
          <Form.Control
            aria-label="Text input with dropdown button"
            aria-describedby="recipe-directions"
            value={newDirection}
            onChange={handleNewDirection}
            placeholder={`Enter Step ${directions.length + 1} of Recipe`}
          />
        </InputGroup>

        <Form.Group className="mb-3">
          {directions ?
            directions.map((direction) => (
              <Form.Control
                value={direction}
                disabled
              >
              </Form.Control>
            ))
            :
            <Form.Control
              placeholder={`Step 1`}
              disabled
            >
            </Form.Control>
          }
        </Form.Group>


        <p>{JSON.stringify(directions, null, 2)}</p>

        <Form.Label>Tags</Form.Label>
        <Form.Group className="mb-3">
          <Form.Select aria-label="Tag Select">

            {tags.map((tag) => (
              <option value={tags.indexOf(tag)}>{capitalizeName(tag)}</option>
            ))}

            <option value="new">New Tag</option>
          </Form.Select>
        </Form.Group> */}
        <Button variant="primary" onClick={submitRecipe}>
          Submit Recipe
        </Button>
      </Form>
    </Container>
  )
}
export default About
