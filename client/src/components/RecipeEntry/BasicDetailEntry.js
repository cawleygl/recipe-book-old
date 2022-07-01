import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import ThumbnailCard from "../../components/RecipeViews/ThumbnailCard";

import { handleEnterKeyDown } from "../../hooks/useTools";

const BasicDetailEntry = ({
  handleChange, values, errors, touched, handleImageTypeChange,
  recipeName, setRecipeName,
  recipeSource, setRecipeSource,
  recipeDescription, setRecipeDescription,
  recipeImgObject, setRecipeImgObject
}) => {

  const [imageSwitch, setImageSwitch] = useState("");

  return (
    <>
      <Col className="mb-3" md={3}>
        <ThumbnailCard recipes={[values]} />
      </Col>
      <Col md={9}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="recipe-name"
                label="Name"
              >
                <Form.Control
                  as="input"
                  type="text"
                  name="recipeName"
                  isInvalid={errors.recipeName && touched.recipeName}
                  onChange={handleChange}
                  value={values.recipeName}
                  placeholder="Name"
                  onKeyDown={(event) => handleEnterKeyDown(event, handleChange)}
                  aria-label="Text input recipe name"
                  aria-describedby="recipe-name-entry"
                />
              </FloatingLabel>
              <Form.Text>{errors.recipeName && touched.recipeName ? errors.recipeName : null}</Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="recipe-source"
                label="Source"
              >
                <Form.Control
                  as="input"
                  type="text"
                  name="source"
                  isInvalid={errors.source && touched.source}
                  onChange={handleChange}
                  value={values.source}
                  placeholder="Source"
                  onKeyDown={(event) => handleEnterKeyDown(event, handleChange)}
                  aria-label="Text input recipe source"
                  aria-describedby="recipe-source-entry"
                />
              </FloatingLabel>
              <Form.Text>{errors.source && touched.source ? errors.source : null}</Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <FloatingLabel
              controlId="recipe-description"
              label="Description"
            >
              <Form.Control
                as="input"
                name="description"
                isInvalid={errors.description && touched.description}
                onChange={handleChange}
                value={values.description}
                placeholder="Description"
                onKeyDown={(event) => handleEnterKeyDown(event, handleChange)}
                aria-label="Text input recipe description"
                aria-describedby="recipe-description-entry"
              />
            </FloatingLabel>
            <Form.Text>{errors.description && touched.description ? errors.description : null}</Form.Text>
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
                      name='imgUpload'
                      onChange={handleChange}
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
                      name='imgLink'
                      onChange={handleChange}
                      aria-label="Text input recipe image url"
                      aria-describedby="recipe-image-link"
                      onKeyDown={(event) => handleEnterKeyDown(event, handleChange)}
                    />
                    <Form.Text>Paste an image URL here to use an image from the web.</Form.Text>
                  </>
                }
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </Col>
    </>
  )
}
export default BasicDetailEntry
