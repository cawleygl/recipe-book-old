import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import API from "../../utils/API";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'


import "../style.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'



import { customBadge, capitalizeName, imageErrorHandler } from "../../utils/useTools";

function AllInfo({ recipes }) {
  let log = false;

  // Setting our component's initial state
  const [tags, setTags] = useState([])

  // Load all recipes and tags on mount
  useEffect(() => {
    loadTags()
  }, [])

  // Loads all tags and sets them to tags
  function loadTags() {
    API.getTags()
      .then(res => {
        log && console.log("res", res);
        setTags(res.data)
      }).catch(err => console.log(err));
  };

  return (
    <Accordion>
      <h5 className="my-3">All Info View</h5>
      {recipes ?
        recipes.map((recipe, index) => (
          <Accordion.Item eventKey={index} key={recipe._id}>
            <Accordion.Header>
              <Link to={`/recipes/${recipe._id}`}>
                {recipe.name}
              </Link>
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col md={4} className="d-none d-md-block">
                  <Image thumbnail
                    src={recipe.img.preview}
                    onError={(event) => imageErrorHandler(event.target)}
                    width="100%" />
                </Col>
                <Col>
                  <div className='title'>
                    <Row>
                      <div className="header">{capitalizeName(recipe.name)}</div>
                      {recipe.tags && tags ? recipe.tags.map((tagID, index) => (
                        <div key={tagID}>
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
                        </div>
                      )) : null
                      }

                    </Row>
                    <div className="desc">"{recipe.description}"</div>
                    <div>-{recipe.source}</div>
                  </div>

                  <h4 className='mt-3'>Ingredients</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                    ))}
                  </ul>
                  <h4>Directions</h4>
                  <ol>
                    {recipe.directions.map((direction, index) => (
                      <li key={index}>{direction}</li>
                    ))}
                  </ol>
                  {recipe.notes &&
                    <>
                      <h4>Notes</h4>
                      <p>{recipe.notes}</p>
                    </>
                  }
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))
        : null
      }
    </Accordion>
  );
}


export default AllInfo;
