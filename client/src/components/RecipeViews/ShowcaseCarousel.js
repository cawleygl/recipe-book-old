import React, { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'

import placeholder from '../../assets/logo512.png'
import '../style.css'

import { customBadge, capitalizeName, imageErrorHandler } from "../../utils/useTools";

function ShowcaseCarousel({ recipes, tags }) {
  let log = false;

  return (
    <Carousel keyboard touch>
      {recipes.length ?
        recipes.map((recipe) => (
          <Carousel.Item key={recipe._id}>
            <img
              className="carousel-img d-block w-100"
              src={recipe.img.preview}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3 className='header'>{recipe.name}</h3>
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
                  :
                  <p>NONE</p>
                }
              </div>
              <p className='desc'>'{recipe.description}'</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
        : null}
    </Carousel >
  );
}

export default ShowcaseCarousel;
