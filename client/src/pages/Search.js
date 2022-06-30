import React, { useState } from "react";
import API from "../utils/API";

import ThumbnailCard from "../components/RecipeViews/ThumbnailCard";

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const Search = () => {
  let log = false;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      API.getRecipeBySearchTerm(searchTerm)
        .then(res => {
          log && console.log("res", res);
          res.data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
          setSearchResults(res.data);
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <Container >
      <Form className="d-flex my-3" >
        <Form.Control
          type="search"
          placeholder="Recipe"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          className="me-2"
          aria-label="Search"
        />
        <Button
          as="input"
          type="submit"
          variant="primary"
          onClick={(event) => handleSearchSubmit(event)}
          value="Search"
        />
      </Form>
      <ThumbnailCard recipes={searchResults} />
    </Container>
  )
}

export default Search
