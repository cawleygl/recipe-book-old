import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BootstrapSwitchButton from "bootstrap-switch-button-react";

import ThumbnailCard from "../../components/RecipeViews/ThumbnailCard";


const BasicDetailEntry = ({
  recipeName, setRecipeName,
  recipeSource, setRecipeSource,
  recipeDescription, setRecipeDescription,
  recipeImgObject, setRecipeImgObject
}) => {

  const [imageSwitch, setImageSwitch] = useState("");

  return (
    <Row>
      <Col className="mb-3" md={3}>
        <ThumbnailCard recipes={[{
          name: recipeName,
          source: recipeSource,
          description: recipeDescription,
          img: recipeImgObject,
        }]} />
      </Col>
      <Col md={9}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Name"
                onChange={(event) => setRecipeName(event.target.value)}
                aria-label="Text input recipe name"
                aria-describedby="recipe-name-entry"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Source</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Source"
                onChange={(event) => setRecipeSource(event.target.value)}
                aria-label="Text input recipe source"
                aria-describedby="recipe-source-entry"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              onChange={(event) => setRecipeDescription(event.target.value)}
              aria-label="Text input recipe description"
              aria-describedby="recipe-description-entry"
            />
            <Form.Text>Enter a basic description of this dish.</Form.Text>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Row>
              <Col className="mb-3" md={'auto'}>
                <BootstrapSwitchButton
                  width={100}
                  onstyle="primary"
                  offstyle="primary"
                  onlabel='Upload'
                  offlabel='Link'
                  onChange={setImageSwitch}
                />
              </Col>
              <Col>
                {imageSwitch ?
                  <>
                    <Form.Control
                      as="input"
                      type="file"
                      accept="image/*"
                      placeholder="Upload Image"
                      onChange={(event) => setRecipeImgObject({
                        preview: URL.createObjectURL(event.target.files[0]),
                        data: event.target.files[0],
                      })}
                      aria-label="File input recipe image upload"
                      aria-describedby="recipe-image-upload"
                    />
                    <Form.Text>Click 'Choose File' to upload an image of this dish from your device.</Form.Text>
                  </>
                  :
                  <>
                    <Form.Control
                      as="input"
                      type="text"
                      placeholder="Image URL"
                      onChange={(event) => setRecipeImgObject({
                        preview: event.target.value,
                        data: null,
                      })}
                      aria-label="Text input recipe image url"
                      aria-describedby="recipe-image-link"
                    />
                    <Form.Text>Paste an image URL here to use an image from the web.</Form.Text>
                  </>
                }
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </Col>
    </Row>
  )
}
export default BasicDetailEntry
