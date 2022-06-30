import React, { useState, useEffect } from "react";
import API from "../utils/API";

import BasicDetailEntry from "../components/RecipeEntry/BasicDetailEntry";
import DirectionEntry from "../components/RecipeEntry/DirectionEntry";
import IngredientEntry from "../components/RecipeEntry/IngredientEntry";
import ExtraDetailEntry from "../components/RecipeEntry/ExtraDetailEntry";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';

import useForm from '../hooks/useForm';

const Entry = () => {
  let log = true;
  // Submit current recipe and save to db
  function handleFormSubmit() {
    console.log("Callback function when form is submitted!");

    log && console.log("Submit", values)

    API.saveRecipe(values)
      .then(res => log && console.log("res", res))
      .catch(err => console.log(err));
  };

  //Custom hook call
  const {
    values,
    errors,
    touched,
    currentStep,
    currentItem,
    addErrors,
    loadedTags,
    handleImageTypeChange,
    handleChange,
    handleSubmit,
    handleSelect,
    handleAdd,
    handleDelete,
    handleToggle
  } = useForm(handleFormSubmit);

  const [allTags, setAllTags] = useState([]);

  // Load all recipes and tags on mount
  useEffect(() => {
    loadTags();
  }, [])

  // Loads all tags and sets them to tags
  async function loadTags() {
    try {
      let tagsRes = await API.getTags()
      log && console.log("Entry Page Tags Response:", tagsRes);
      setAllTags(tagsRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('TAGS DB CALL -', err);
    }
  };

  const [recipeObject, setRecipeObject] = useState({})

  const [recipeName, setRecipeName] = useState("");
  const [recipeSource, setRecipeSource] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeImgObject, setRecipeImgObject] = useState({ data: "", preview: "" });
  const [ingredientArray, setIngredientArray] = useState([""]);
  const [directionArray, setDirectionArray] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipeNotes, setRecipeNotes] = useState("");

  // Set Recipe object when variables change
  useEffect(() => {
    let newRecipe = {
      name: recipeName,
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
      <Form onSubmit={(event) => {
        event.preventDefault();
        // handleSubmit();
      }}>
        <h2 className="my-3">New Recipe</h2>
        <Row>
          <BasicDetailEntry
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}

            handleImageTypeChange={handleImageTypeChange}

            recipeName={recipeName}
            setRecipeName={setRecipeName}

            recipeSource={recipeSource}
            setRecipeSource={setRecipeSource}

            recipeDescription={recipeDescription}
            setRecipeDescription={setRecipeDescription}

            recipeImgObject={recipeImgObject}
            setRecipeImgObject={setRecipeImgObject}
          />
        </Row>
        <Row>
          <Col md={6}>
            <IngredientEntry
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              addErrors={addErrors}

              currentItem={currentItem}
              handleSelect={handleSelect}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          </Col>
          <Col>
            <DirectionEntry
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              addErrors={addErrors}

              currentStep={currentStep}
              handleSelect={handleSelect}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
            />
          </Col>
        </Row>
        <Row>
          <ExtraDetailEntry
            handleChange={handleChange}
            values={values}
            errors={errors}
            loadedTags={loadedTags}

            allTags={allTags}
            setAllTags={setAllTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            setRecipeNotes={setRecipeNotes}
          />
        </Row>

        <Button onClick={handleSubmit} className="my-3" variant="primary" id="submit-recipe">
          Submit Recipe
        </Button>

      </Form>

    </Container >
  )
}
export default Entry;
