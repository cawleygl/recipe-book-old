import React, { useState, useEffect } from "react";
import API from "../utils/API";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../components/style.css'

import ShowcaseCarousel from "../components/RecipeViews/ShowcaseCarousel";

import { getRandomInt } from "../utils/useTools";


const LandingPage = () => {
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
      log && console.log("Landing Page Recipes Response:", recipesRes);
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
      log && console.log("Landing Page Tags Response:", tagsRes);
      setAllTags(tagsRes.data);
    } catch (err) {
      // Handle Error Here
      console.error('TAGS DB CALL -', err);
    }
  };

  const [randomRecipe, setRandomRecipe] = useState([])
  const [tagRecipes, setTagRecipes] = useState([])

  // Parse recipes and tags when props are passed
  useEffect(() => {
    if (allRecipes.length) {
      getRandomRecipe();
    }
  }, [allRecipes])

  useEffect(() => {
    if (allTags.length) {
      getTagRecipes();
    }
  }, [allTags])

  const getRandomRecipe = async () => {
    let randomIndex = getRandomInt(allRecipes.length);
    setRandomRecipe([allRecipes[randomIndex]]);
  };

  const getTagRecipes = async () => {
    let randomTagIndex = getRandomInt(allTags.length);
    let randomTag = (allTags[randomTagIndex]);
    console.log(randomTag)
  };


  return (
    <Container>
      {randomRecipe ?
        <Row>
          <h2 className="my-3">Random Recipe</h2>
          <ShowcaseCarousel
            recipes={randomRecipe}
            tags={allTags}
          />
        </Row>
        : null}
      {tagRecipes ?
        <Row>
          <h2 className="my-3">Tag Showcase</h2>
          <ShowcaseCarousel
            recipes={tagRecipes}
            tags={allTags}
          />
        </Row>
        : null}
      {allRecipes ?
        <Row>
          <h2 className="my-3">All Recipes</h2>
          <ShowcaseCarousel
            recipes={allRecipes}
            tags={allTags}
          />
        </Row>
        : null}
    </Container >
  )
}

export default LandingPage
