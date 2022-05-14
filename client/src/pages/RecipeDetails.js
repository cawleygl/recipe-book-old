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
  let log = false;

  let { id } = useParams();

  // Setting our component's initial state
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [recipeObject, setRecipeObject] = useState("");
  const [tags, setTags] = useState("");

  const [recipeName, setRecipeName] = useState("");
  const [recipeSource, setRecipeSource] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeImgObject, setRecipeImgObject] = useState({ data: "", preview: "" });
  const [ingredientArray, setIngredientArray] = useState([""]);
  const [directionArray, setDirectionArray] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipeNotes, setRecipeNotes] = useState("");


  // Load all recipes and tags on mount
  useEffect(() => {
    loadRecipe(id)
    loadTags()
  }, [])

  // Loads all recipes and sets them to recipes
  function loadRecipe(id) {
    API.getRecipeById(id)
      .then(res => {
        log && console.log("res", res);
        setRecipeObject(res.data);
        setRecipeName(res.data.name);
        setRecipeSource(res.data.source);
        setRecipeDescription(res.data.description);
        setRecipeImgObject(res.data.img);
        setIngredientArray(res.data.ingredients);
        setDirectionArray(res.data.directions);
        setSelectedTags(res.data.tags);
        setRecipeNotes(res.data.notes);
      }).catch(err => console.log(err));
  };

  // Loads all tags and sets them to tags
  function loadTags() {
    API.getTags()
      .then(res => {
        log && console.log("res", res);
        setTags(res.data);
      }).catch(err => console.log(err));
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
                  {selectedTags.length && tags.length ? selectedTags.map((tagID, index) => (
                    <Col className='px-1' xs='auto' key={index}>
                      {customBadge(
                        // Find tag name with matching ID from tags state variable
                        tags.find(tag => tag._id === tagID) ? capitalizeName(tags.find(tag => tag._id === tagID).name) : null,
                        // Pass in ID
                        tagID,
                        // Find tag color with matching ID from tags state variable
                        tags.find(tag => tag._id === tagID) ? tags.find(tag => tag._id === tagID).tagColor : null,
                        // Find text color with matching ID from tags state variable
                        tags.find(tag => tag._id === tagID) ? tags.find(tag => tag._id === tagID).textColor : null,
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
