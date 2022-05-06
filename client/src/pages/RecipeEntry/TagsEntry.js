import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { capitalizeName, customBadge, colorButton } from "../../utils/useTools";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import DropdownButton from 'react-bootstrap/DropdownButton'

const TagsEntry = ({ selectedTags, handleSelectedTags }) => {
  let log = false;

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

    createTag(tagCreate);

    setNewTag("");
    setParsedNewTag("");
    setTagColor("#0B6EFD");
    setTextColor("#ffffff");
  };

  const handleTagColor = (event) => {
    setTagColor(event.target.value);
  };
  const handleTextColor = (event) => {
    setTextColor(event.target.value);
  };

  const handleColorButton = (event) => {

    const tag = event.target.closest('button').dataset.tagcolor;
    const text = event.target.closest('button').dataset.textcolor;

    setTagColor(tag);
    setTextColor(text);

  };

  const handleNewTag = (event) => {
    setNewTag(event.target.value);
    let parsedTag = event.target.value.trim().toLowerCase().replaceAll(' ', '-')

    setParsedNewTag(parsedTag);

    // Check if tag already exists
    if (tags.find(tag => tag.name === parsedTag)) {
      setRepeatTag(true);
    } else {
      setRepeatTag(false);
    }
  };

  const handleTagChange = (event) => {
    const index = parseInt(event.target.dataset.index);
    const id = event.target.id;
    const arrayvalue = [...selectedTags];

    // If setting checked to true, push ID to array 
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
        log && console.log("res", res);
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
        log && console.log("res", res);
        setTags(res.data)
        loadTags();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Row>
          <Form.Label>Tags</Form.Label>
        </Row>
        <Row>
          <Col sm={6} className="mb-3">
            {tags.length > 0 && tags.map((tag, index) => (
              <Form.Check
                inline
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
              <InputGroup hasValidation className="mb-1">
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

            <Row className="mb-1">
              <Form.Text>Preset Colors</Form.Text>
              <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Bright" className='py-0'>
                  {colorButton("FireBrick", "white", handleColorButton)}
                  {colorButton("DarkOrange", "white", handleColorButton)}
                  {colorButton("Gold", "black", handleColorButton)}
                  {colorButton("ForestGreen", "white", handleColorButton)}
                  {colorButton("DodgerBlue", "white", handleColorButton)}
                  {colorButton("MediumBlue", "white", handleColorButton)}
                  {colorButton("RebeccaPurple", "white", handleColorButton)}
                  {colorButton("Plum", "black", handleColorButton)}
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Tropical" className='py-0'>
                  {colorButton("Crimson", "white", handleColorButton)}
                  {colorButton("OrangeRed", "white", handleColorButton)}
                  {colorButton("Yellow", "black", handleColorButton)}
                  {colorButton("Chartreuse", "black", handleColorButton)}
                  {colorButton("Aquamarine", "black", handleColorButton)}
                  {colorButton("Teal", "white", handleColorButton)}
                  {colorButton("MediumVioletRed", "white", handleColorButton)}
                  {colorButton("LightCoral", "white", handleColorButton)}
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Pastel" className='py-0'>
                  {colorButton("MistyRose", "FireBrick", handleColorButton)}
                  {colorButton("AntiqueWhite", "DarkOrange", handleColorButton)}
                  {colorButton("LemonChiffon", "GoldenRod ", handleColorButton)}
                  {colorButton("HoneyDew", "ForestGreen", handleColorButton)}
                  {colorButton("LightCyan", "DodgerBlue", handleColorButton)}
                  {colorButton("LightSteelBlue", "MediumBlue", handleColorButton)}
                  {colorButton("Lavender", "RebeccaPurple", handleColorButton)}
                  {colorButton("LavenderBlush", "Plum", handleColorButton)}
                </DropdownButton>
                <DropdownButton as={ButtonGroup} title="Dark" className='py-0'>
                  {colorButton("DarkRed", "MistyRose", handleColorButton)}
                  {colorButton("Chocolate", "AntiqueWhite", handleColorButton)}
                  {colorButton("DarkGoldenRod", "LemonChiffon", handleColorButton)}
                  {colorButton("DarkGreen", "HoneyDew", handleColorButton)}
                  {colorButton("SteelBlue", "LightCyan", handleColorButton)}
                  {colorButton("MidnightBlue", "LightSteelBlue", handleColorButton)}
                  {colorButton("Indigo", "Lavender", handleColorButton)}
                  {colorButton("DarkMagenta", "LavenderBlush", handleColorButton)}
                </DropdownButton>
              </ButtonGroup>
            </Row>

            <Row>
              <Col xs={'auto'}>
                <Form.Text>Background</Form.Text>
                <Form.Control
                  type="color"
                  id="tagColorInput"
                  defaultValue="#0B6EFD"
                  onChange={handleTagColor}
                  title="Tag Background Color"
                />
              </Col>
              <Col>
                <Form.Text>Text</Form.Text>
                <Form.Control
                  xs='20px'
                  type="color"
                  id="textColorInput"
                  defaultValue="#ffffff"
                  onChange={handleTextColor}
                  title="Tag Text color"
                />
              </Col>
            </Row>
            <Row>
            </Row>
          </Col>
        </Row>
      </Form.Group>
    </>
  )
}
export default TagsEntry
