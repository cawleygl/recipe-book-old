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
    <>
      <Container>
        <h4 className="my-3">Recipe Details</h4>
        {recipeObject ?
          <Row key={recipeObject._id}>
            <Col md={4} className="d-none d-md-block">
              <Image thumbnail
                src={recipeImgObject.preview}
                onError={(event) => imageErrorHandler(event.target)}
                width="100%" />
            </Col>
            <Col>
              <div>
                <Row>
                  <Col xs='auto' className='m-0'>
                    <div className="header">{capitalizeName(recipeName)}</div>
                  </Col>
                  <Col md={6} className='py-2'>
                    <Button variant="outline-primary" id="edit-button" onClick={handleShow}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </Col>
                </Row>
                <Row className='ms-1 mb-1'>
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
                </Row>
                <div className="desc">"{recipeDescription}"</div>
                <div>-{recipeSource}</div>
              </div>

              <h4 className='mt-3'>Ingredients</h4>
              <ol>
                {ingredientArray.map((ingredient, index) => (
                  <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                ))}
              </ol>
              <h4>Directions</h4>
              <ol>
                {directionArray.map((direction, index) => (
                  <li key={index}>{direction}</li>
                ))}
              </ol>
              {recipeNotes &&
                <>
                  <h4>Notes</h4>
                  <p>{recipeNotes}</p>
                </>
              }
            </Col>
          </Row>
          : null
        }
      </Container>
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

    </>
  );
}

export default RecipeDetails;
