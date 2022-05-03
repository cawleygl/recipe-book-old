import React, { useState, useEffect } from "react";
import API from "../../utils/API";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { capitalizeName, customBadge, colorButton } from "../../utils/useTools";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

const TagsEntry = ({ selectedTags, handleSelectedTags }) => {

  const [tags, setTags] = useState([""]);

  const [checkedState, setCheckedState] = useState([""]);

  const [newTag, setNewTag] = useState("");
  const [parsedNewTag, setParsedNewTag] = useState("tag-name");

  const [tagColor, setTagColor] = useState("#0B6EFD");
  const [textColor, setTextColor] = useState("#ffffff");

  const [repeatTag, setRepeatTag] = useState(false);

  useEffect(() => {
    // Load tags and create checked state array on mount
    loadTags()
  }, [])

  const addTag = () => {
    let tagCreate = { name: parsedNewTag, tagColor: tagColor, textColor: textColor };
    console.log("Add Tag", tagCreate);

    createTag(tagCreate);

    setNewTag("");
    setParsedNewTag("");
    setTagColor("");
  };

  const handleTagColor = (event) => {
    if (!event.target.value) {
      const value = event.target.closest('button').value;
      console.log(value);
      setTagColor(value);
    } else {
      console.log(event.target.value);
      setTagColor(event.target.value);
    }
  };
  const handleTextColor = (event) => {
    if (!event.target.value) {
      const value = event.target.closest('button').value;
      console.log(value);
      setTextColor(value);
    } else {
      console.log(event.target.value);
      setTextColor(event.target.value);
    }
  };

  const handleNewTag = (event) => {
    setNewTag(event.target.value);
    let parsedTag = event.target.value.trim().toLowerCase().replaceAll(' ', '-')
    console.log(typeof parsedTag);

    setParsedNewTag(parsedTag);

    // Check if tag already exists
    if (tags.find(tag => tag.name === parsedTag)) {
      setRepeatTag(true);
      console.log("Repeat")
    } else {
      setRepeatTag(false);
    }
  };

  const handleTagChange = (event) => {
    const index = parseInt(event.target.dataset.index);
    const id = event.target.id;
    const arrayvalue = [...selectedTags];

    // If setting checked to true, push ID to array 
    console.log(checkedState[index])
    if (!checkedState[index]) {
      arrayvalue.push(id)
      handleSelectedTags(arrayvalue);

      // If setting to false, find ID and splice
    } else {
      const removed = arrayvalue.filter(tagId => tagId !== id);
      handleSelectedTags(removed);
    }
    // Update checked state
    updateCheckState(index);
  };

  const updateCheckState = (position) => {
    // Destructure current state array
    const arrayvalue = [...checkedState];
    // Switch checked array boolean at checked position
    const updatedCheckedState = arrayvalue.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  // Loads all tags and sets them to tags
  function loadTags() {
    API.getTags()
      .then(res => {
        console.log("res", res);
        res.data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setTags(res.data);
        setCheckedState(new Array(res.data.length).fill(false));
      })
      .catch(err => console.log(err));
  };
  // Add new tag all tags and sets them to tags
  function createTag(tag) {
    API.saveTag(tag)
      .then(res => {
        console.log("res", res);
        setTags(res.data)
        loadTags();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Row>
          <Col sm={6} className="mb-3">
            <Form.Label>Tags</Form.Label>
            {tags.length > 0 && tags.map((tag, index) => (
              <Form.Check
                key={tag._id}
                type={"switch"}
                label={customBadge(tag.name, index, tag._id, tag.tagColor, tag.textColor)}
                id={tag._id}
                data-index={index}
                onChange={handleTagChange}
              />
            ))}
          </Col>
          <Col sm={6}>
            <Row>
              <Col xs='auto'>
                <Form.Label>Add a New Tag</Form.Label>
              </Col>
              <Col>
                {customBadge(parsedNewTag, 0, "sampleTag", tagColor, textColor, true)}
              </Col>
            </Row>
            <Row>
              <InputGroup hasValidation className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Tag Name"
                  title="addTag"
                  onChange={handleNewTag}
                  value={newTag}
                  aria-label="Text input add recipe tag"
                  aria-describedby="recipe-tag-entry"
                  isInvalid={repeatTag}
                />
                <Button
                  variant="outline-primary"
                  id="add-step-button"
                  onClick={addTag}
                  disabled={repeatTag}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Form.Control.Feedback type="invalid">
                  '{capitalizeName(parsedNewTag)}' tag already exists.
                </Form.Control.Feedback>
              </InputGroup>
            </Row>
            <Row>
              <Col xs={6}>
                <Form.Text>Background Color</Form.Text>
                <ButtonGroup className="mb-1">
                  <Form.Control
                    type="color"
                    id="tagColorInput"
                    defaultValue="#0B6EFD"
                    onChange={handleTagColor}
                    title="Tag Background Color"
                  />
                  {colorButton("red", "white", handleTagColor)}
                  {colorButton("orange", "white", handleTagColor)}
                  {colorButton("yellow", "black", handleTagColor)}
                  {colorButton("green", "white", handleTagColor)}
                  {colorButton("blue", "white", handleTagColor)}
                  {colorButton("purple", "white", handleTagColor)}
                </ButtonGroup>
                <ButtonGroup className="mb-1">
                  {colorButton("FireBrick", "white", handleTagColor)}
                  {colorButton("DarkOrange", "white", handleTagColor)}
                  {colorButton("Gold", "black", handleTagColor)}
                  {colorButton("SeaGreen", "white", handleTagColor)}
                  {colorButton("SkyBlue", "black", handleTagColor)}
                  {colorButton("RoyalBlue", "white", handleTagColor)}
                  {colorButton("RebeccaPurple", "white", handleTagColor)}
                </ButtonGroup>
                <ButtonGroup className="mb-1">
                  {colorButton("LightPink", "black", handleTagColor)}
                  {colorButton("LightSalmon", "black", handleTagColor)}
                  {colorButton("LemonChiffon", "black", handleTagColor)}
                  {colorButton("HoneyDew", "black", handleTagColor)}
                  {colorButton("LightCyan", "black", handleTagColor)}
                  {colorButton("LightSkyBlue", "black", handleTagColor)}
                  {colorButton("Plum", "black", handleTagColor)}
                </ButtonGroup>
              </Col>
              <Col xs={6}>
                <Form.Text>Text Color</Form.Text>
                <Form.Control
                  xs='20px'
                  type="color"
                  id="textColorInput"
                  defaultValue="#ffffff"
                  onChange={handleTextColor}
                  title="Tag Text color"
                />
                <Row className="mb-1">
                  <ButtonGroup>
                    {colorButton("black", "white", handleTextColor)}
                    {colorButton("white", "black", handleTextColor)}
                  </ButtonGroup>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>
    </>
  )
}
export default TagsEntry
