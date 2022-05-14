import React, { useState, useEffect } from "react";
import API from "../utils/API";

import { useParams } from "react-router-dom";

import AllInfo from '../components/RecipeViews/AllInfo'
import ThumbnailCard from "../components/RecipeViews/ThumbnailCard";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'


import Image from 'react-bootstrap/Image'

import { customBadge, capitalizeName, imageErrorHandler } from "../utils/useTools";


const Search = () => {
  let log = false;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    API.getRecipeBySearchTerm(searchTerm)
      .then(res => {
        log && console.log("res", res);
        res.data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setSearchResults(res.data);
      })
      .catch(err => console.log(err));
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
      <Accordion defaultActiveKey="0" >
        <ThumbnailCard recipes={searchResults} />
      </Accordion>
    </Container>
  )
}

export default Search
