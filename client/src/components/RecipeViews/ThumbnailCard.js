import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import API from "../../utils/API";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

import '../style.css'

import { customBadge, capitalizeName, imageErrorHandler } from "../../utils/useTools";

function ThumbnailCard({ recipes }) {
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
    <Row xs={1} md={2} lg={3}>
      {recipes ?
        recipes.map((recipe, index) => (
          <div key={index}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={recipe.img.preview}
                onError={(event) => imageErrorHandler(event.target)}
              />
              <Card.Body>
                <Card.Title className='header'>{recipe.name}</Card.Title>
                {recipe.tags && tags ?
                  <Card.Title>
                    {recipe.tags.map((tagID) => (
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
                    ))}
                  </Card.Title>
                  : null}
                <Card.Subtitle>{recipe.source ? `By ${recipe.source}` : null}</Card.Subtitle>
                <Card.Text className="desc">{recipe.description ? `'${recipe.description}'` : null}</Card.Text>
                {recipe._id ?
                  <Link to={`/recipes/${recipe._id}`}>
                    <Card.Text>Details</Card.Text>
                  </Link>
                  : null}
              </Card.Body>
            </Card>
          </div>
        ))
        : null
      }
    </Row>
  );
}


export default ThumbnailCard;
