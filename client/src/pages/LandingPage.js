import React, { useState, useEffect } from "react";
import API from "../utils/API";

import Container from 'react-bootstrap/Container'

import '../components/style.css'

import ShowcaseCarousel from "../components/RecipeViews/ShowcaseCarousel";


const LandingPage = () => {
  let log = true;

  // Setting our component's initial state
  const [recipes, setRecipes] = useState([])
  const [tags, setTags] = useState([])

  // Load all recipes and tags on mount
  useEffect(() => {
    loadRecipes()
    loadTags();
  }, [])

  // Loads all recipes and sets them to recipes
  function loadRecipes() {
    API.getRecipes()
      .then(res => {
        res.data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        log && console.log("recipesRes", res);
        setRecipes(res.data);
      }).catch(err => console.log(err));
  };

  async function loadTags() {
    // Load tags from db 
    const response = await API.getTags();
    // Sort alphabetically by name
    response.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    // Set to state variable
    setTags(response);
  };

  return (
    <Container>
      <h2 className="my-3">Recipe-Book</h2>
        <ShowcaseCarousel 
        recipes={recipes}
        tags={tags}
        />
    </Container>
  )
}

export default LandingPage
