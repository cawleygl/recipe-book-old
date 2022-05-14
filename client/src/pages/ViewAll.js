import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";

import AllInfo from '../components/RecipeViews/AllInfoAccordion'
import ThumbnailCard from "../components/RecipeViews/ThumbnailCard";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Accordion from 'react-bootstrap/Accordion'
import Image from 'react-bootstrap/Image'

import { customBadge, capitalizeName, imageErrorHandler } from "../utils/useTools";

function ViewAll() {
  let log = false;
  // Setting our component's initial state
  const [recipes, setRecipes] = useState([])
  const [tags, setTags] = useState([])

  // Load all recipes and tags on mount
  useEffect(() => {
    loadRecipes()
    loadTags()
  }, [])

  // Loads all recipes and sets them to recipes
  function loadRecipes() {
    API.getRecipes()
      .then(res => {
        res.data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        log && console.log("res", res);
        setRecipes(res.data);
      }).catch(err => console.log(err));
  };

  // Loads all tags and sets them to tags
  function loadTags() {
    API.getTags()
      .then(res => {
        log && console.log("res", res);
        setTags(res.data)
      }).catch(err => console.log(err));
  };

  return (
    <>
      <h4 className="my-3">Recipe Views</h4>
      <Accordion defaultActiveKey="0" >
        <AllInfo recipes={recipes} />
      </Accordion>
    </>
  );
}


export default ViewAll;
