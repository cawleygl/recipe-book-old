import React, { useState } from "react";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import { imageErrorHandler } from "../../utils/useTools"

import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const ImageEntry = ({ recipeImgObject, setRecipeImgObject }) => {
  const { preview } = recipeImgObject;

  const [imageSwitch, setImageSwitch] = useState("");

  return (
    <Form.Group className="mb-3">
      <Form.Label>Image</Form.Label>
      <Row>
        <Col className="mb-3" sm={2}>
          <Image thumbnail
            src={preview}
            onError={(event) => imageErrorHandler(event.target)}
            width="100%" />
        </Col>
        <Col className="mb-3" sm={'auto'}>
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
  )
}
export default ImageEntry
