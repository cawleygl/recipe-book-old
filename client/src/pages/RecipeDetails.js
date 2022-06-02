import React, { useState, useEffect } from "react";
import API from "../utils/API";

import { useParams } from "react-router-dom";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import "../components/style.css"

import Image from 'react-bootstrap/Image'

import { customBadge, capitalizeName, imageErrorHandler } from "../utils/useTools";

function RecipeDetails() {
  let log = true;

  const [allRecipes, setAllRecipes] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // Load all recipes and tags on mount
  useEffect(() => {
    loadRecipes();
    loadTags();
  }, [])

  // Loads all recipes and sets them to recipes
  async function loadRecipes() {
    try {
      let recipesRes = await API.getRecipes()
      log && console.log("Recipe Details Page Recipe Response:", recipesRes);
      setAllRecipes(recipesRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('RECIPES DB CALL -', err);
    }
  };

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

  let { id } = useParams();

  // Setting our component's initial state
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [recipeObject, setRecipeObject] = useState("");

  const [recipeName, setRecipeName] = useState("");
  const [recipeSource, setRecipeSource] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeImgObject, setRecipeImgObject] = useState({ data: "", preview: "" });
  const [ingredientArray, setIngredientArray] = useState([""]);
  const [directionArray, setDirectionArray] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipeNotes, setRecipeNotes] = useState("");


  // Load recipe on mount
  useEffect(() => {
    loadRecipe(id)
  }, [])

  // Loads corresponsing recipes by ID
  async function loadRecipe(id) {
    try {
      let recipeRes = await API.getRecipeById(id)
      log && console.log(`Recipe ID# ${id} Response:`, recipeRes);
      setRecipeObject(recipeRes.data);
      setRecipeName(recipeRes.data.name);
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
                <Button variant="outline-primary" id="edit-button" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
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
                <div className="desc">"{recipeDescription}"</div>
                <div>-{recipeSource}</div>
              </div>
            </div>
          </Row>
          <Row>
            <Col md='auto' className='details-ingredients'>
              <h4>Ingredients</h4>
              <ul>
                {ingredientArray.map((ingredient, index) => (
                  <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                ))}
              </ul>
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
              <>
                <h4>Notes</h4>
                <p>{recipeNotes}</p>
              </>
            }
          </Row>
        </div>

        : null
      }
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <EditRecipe 
            recipeObject={recipeObject}
            setRecipeObject={setRecipeObject}

            recipeName={recipeName}
            setRecipeName={setRecipeName}

            recipeSource={recipeSource}
            setRecipeSource={setRecipeSource}

            recipeDescription={recipeDescription}
            setRecipeDescription={setRecipeDescription}

            recipeImgObject={recipeImgObject}
            setRecipeImgObject={setRecipeImgObject}

            ingredientArray={ingredientArray}
            setIngredientArray={setIngredientArray}

            directionArray={directionArray}
            setDirectionArray={setDirectionArray}

            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}

            recipeNotes={recipeNotes}
            setRecipeNotes={setRecipeNotes} */}

          {/* /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Container>

  );
}

export default RecipeDetails;
