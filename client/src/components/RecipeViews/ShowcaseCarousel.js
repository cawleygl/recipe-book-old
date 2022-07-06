import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'
import { Link } from "react-router-dom";

import '../style.css'

import { customBadge, capitalizeName, imageErrorHandler } from "../../hooks/useTools";

function ShowcaseCarousel({ recipes, tags }) {
  if (!recipes) return <p>NO RECIPES FOUND</p>
  return (
    <Carousel
      keyboard
      touch
      controls={recipes.length === 1 ? false : true}
    >
{recipes.map((recipe) => (
    <Carousel.Item key={recipe._id}>
      <Link to={`/recipes/${recipe._id}`}>
        <Image
          className="carousel-img d-block w-100"
          src={recipe.img.preview}
          onError={(event) => imageErrorHandler(event.target)}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className='header'>{recipe.recipeName}</h3>
          <div className='tagsContainer'>
            {tags ?
              recipe.tags.map((tagID) => (
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
              ))
              : null
            }
          </div>
          <p className='desc'>'{recipe.description}'</p>
        </Carousel.Caption>
      </Link>
    </Carousel.Item>
  ))
}
    </Carousel >
  );
}

export default ShowcaseCarousel;
