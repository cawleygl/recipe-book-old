import React, { useState, useEffect } from "react";
import API from "../utils/API";

import { useParams } from "react-router-dom";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'


import BasicDetailEntry from "../components/RecipeEntry/BasicDetailEntry";
import DirectionEntry from "../components/RecipeEntry/DirectionEntry";
import IngredientEntry from "../components/RecipeEntry/IngredientEntry";
import ExtraDetailEntry from "../components/RecipeEntry/ExtraDetailEntry";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faScrewdriverWrench, faBook } from '@fortawesome/free-solid-svg-icons'

import "../components/style.css"

import { customBadge, capitalizeName, imageErrorHandler, parseFractionAmount } from "../hooks/useTools";
import CloseButton from "react-bootstrap/esm/CloseButton";
import MyRecipesPage from "./MyRecipesPage";

function RecipeDetails() {
  let log = true;

  // Setting our component's initial state
  const [allTags, setAllTags] = useState([]);
  // Sidebar (Offcanvas) toggle
  const [show, setShow] = useState(false);

  const [recipeObject, setRecipeObject] = useState("");

  const [recipeName, setRecipeName] = useState("");
  const [recipeSource, setRecipeSource] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeImgObject, setRecipeImgObject] = useState({ data: "", preview: "" });
  const [ingredientArray, setIngredientArray] = useState([""]);
  const [directionArray, setDirectionArray] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipeNotes, setRecipeNotes] = useState("");

  let { id } = useParams();

  // Offcanvas open and close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Loads all tags and sets them to tags
  async function loadTags() {
    try {
      let tagsRes = await API.getTags()
      log && console.log("Recipe Details Page Tags Response:", tagsRes);
      setAllTags(tagsRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('TAGS DB CALL -', err);
    }
  };

  // Loads corresponsing recipes by ID
  async function loadRecipe(id) {
    try {
      let recipeRes = await API.getRecipeById(id)
      log && console.log(`Recipe ID# ${id} Response:`, recipeRes);
      setRecipeObject(recipeRes.data);
      setRecipeName(recipeRes.data.recipeName);
      setRecipeSource(recipeRes.data.source);
      setRecipeDescription(recipeRes.data.description);
      setRecipeImgObject(recipeRes.data.img);
      setIngredientArray(recipeRes.data.ingredients);
      setDirectionArray(recipeRes.data.directions);
      setSelectedTags(recipeRes.data.tags);
      setRecipeNotes(recipeRes.data.notes);
    } catch (err) {
      // Handle Error Here
      console.error(`RECIPE ID# ${id} DB CALL -`, err);
    }
  };

  // Update current recipe and save to db
  function handleFormSubmit(event) {
    event.preventDefault();
    log && console.log("Submit", recipeObject)

    if (recipeObject) {
      API.updateRecipe(id, recipeObject)
        .then(res => log && console.log("res", res))
        .catch(err => console.log(err));
    }
    handleClose();
  };

  function handleFormCancel(event) {
    event.preventDefault();
    loadRecipe(id)
    handleClose();
  };

  // Recipe Options Dropdown
  const handleRecipeEdit = () => {
    console.log("Edit");
  };
  const handleRecipeBookmark = () => {
    let myRecipes = JSON.parse(localStorage.getItem('MyRecipes'));

    if (!myRecipes) {
      myRecipes = [id]
    } else {
      if (!myRecipes.includes(id)) {
        myRecipes.push(id)
      }
    }

    localStorage.setItem('MyRecipes', JSON.stringify(myRecipes));
    console.log("myRecipes", myRecipes);
    console.log("Bookmark");
  };
  const handleRecipeCart = () => {
    console.log("Cart");
  };
  const handleRecipePrint = () => {
    console.log("Print");
  };

  const handleRecipeOptions = (event) => {
    event = parseInt(event);
    console.log(event);
    switch (event) {
      case 0:
        handleRecipeEdit();
        break;
      case 1:
        handleRecipeBookmark();
        break;
      case 2:
        handleRecipeCart();
        break;
      case 3:
        handleRecipePrint();
        break;
      default:
        console.error("ERROR");
    }
  };

  // Load all recipes and tags on mount
  useEffect(() => {
    loadTags();
    loadRecipe(id)
  }, [])

  // Set Recipe object when variables change
  useEffect(() => {
    let newRecipe = {
      recipeName: recipeName,
      source: recipeSource,
      description: recipeDescription,
      img: recipeImgObject,
      ingredients: ingredientArray,
      directions: directionArray,
      tags: selectedTags,
      notes: recipeNotes
    };

    setRecipeObject(newRecipe);
    log && console.log("Recipe", newRecipe);

  }, [recipeName, recipeSource, recipeDescription, recipeImgObject, ingredientArray, directionArray, selectedTags, recipeNotes])

  return (
    <Container>
      {recipeObject ?
        <div key={recipeObject._id}>
          <Row>
            <div className="details-container">
              <Image
                className="details-img"
                src={recipeImgObject.preview}
                onError={(event) => imageErrorHandler(event.target)}
                width="100%" />
              <div className="details-caption">
                <div className="header">{capitalizeName(recipeName)}</div>
                {selectedTags && allTags ? selectedTags.map((tagID, index) => (
                  <Col className='px-1' xs='auto' key={index}>
                    {customBadge(
                      // Find tag name with matching ID from tags state variable
                      allTags.find(tag => tag._id === tagID) ? capitalizeName(allTags.find(tag => tag._id === tagID).name) : null,
                      // Pass in ID
                      tagID,
                      // Find tag color with matching ID from tags state variable
                      allTags.find(tag => tag._id === tagID) ? allTags.find(tag => tag._id === tagID).tagColor : null,
                      // Find text color with matching ID from tags state variable
                      allTags.find(tag => tag._id === tagID) ? allTags.find(tag => tag._id === tagID).textColor : null,
                    )}
                  </Col>
                )) : null}
                {recipeSource &&
                  <div className="desc">"{recipeDescription}"</div>
                }
                {recipeSource &&
                  <div>-{recipeSource}</div>
                }
              </div>
              <div className="details-options-button">
                <Dropdown onSelect={handleRecipeOptions}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <FontAwesomeIcon icon={faScrewdriverWrench} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Recipe Options</Dropdown.Header>
                    <Dropdown.Item eventKey={0}>Edit Recipe</Dropdown.Item>
                    <Dropdown.Item eventKey={1}>Bookmark Recipe</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>Add to/Remove from Cart</Dropdown.Item>
                    <Dropdown.Item eventKey={3}>Print View</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Row>
          <Row>
            <Col md='auto' className='details-ingredients mb-3'>
              <h4>Ingredients</h4>
              <Table striped bordered hover size="sm">
                <tbody>
                  {ingredientArray.map((ingredient, index) => (
                    <tr key={index}>
                      <td>
                    {parseFractionAmount(ingredient.ingredientAmount)}{' '}
                    {capitalizeName(ingredient.ingredientUnit)}{ingredient.ingredientUnit ? ' of ' : null}
                    {capitalizeName(ingredient.ingredientName)}{ingredient.ingredientModifier ? ', ' : null}
                    {capitalizeName(ingredient.ingredientModifier)}                        </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <h4>Directions</h4>
              <ol>
                {directionArray.map((direction, index) => (
                  <li key={index}>{direction}</li>
                ))}
              </ol>
            </Col>
          </Row>
          <Row>
            {recipeNotes &&
              <Alert variant="primary">
                <p>{recipeNotes}</p>
              </Alert>
            }
          </Row>
        </div>

        : null
      }
      <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>Edit Recipe</Offcanvas.Title>
          <CloseButton onClick={handleFormCancel} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <BasicDetailEntry
            recipeName={recipeName}
            setRecipeName={setRecipeName}

            recipeSource={recipeSource}
            setRecipeSource={setRecipeSource}

            recipeDescription={recipeDescription}
            setRecipeDescription={setRecipeDescription}

            recipeImgObject={recipeImgObject}
            setRecipeImgObject={setRecipeImgObject}
          />

          <IngredientEntry
            ingredientArray={ingredientArray}
            setIngredientArray={setIngredientArray}
          />

          <DirectionEntry
            directionArray={directionArray}
            setDirectionArray={setDirectionArray}
          />

          <ExtraDetailEntry
            allTags={allTags}
            setAllTags={setAllTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setRecipeNotes={setRecipeNotes}
          />

          <Button variant="danger" onClick={handleFormCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleFormSubmit}>Submit Changes</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default RecipeDetails;
