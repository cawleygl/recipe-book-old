import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "../style.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import DropdownButton from 'react-bootstrap/DropdownButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { capitalizeName, customBadge, colorButton } from "../../utils/useTools";

const EditTagsModal = ({ tags, setTags, loadTags, selectedTags, setSelectedTags, handleCloseModal }) => {
  let log = false;

  //Tab state
  const [key, setKey] = useState('newTag');

  const [newTagName, setNewTagName] = useState("");
  const [parsedNewTagName, setParsedNewTagName] = useState("tag-name");
  const [tagEditId, setTagEditId] = useState("");

  const [tagColor, setTagColor] = useState("#0B6EFD");
  const [textColor, setTextColor] = useState("#ffffff");

  const [repeatTag, setRepeatTag] = useState(false);

  useEffect(() => {
    // Load tags and create checked state array on mount
    loadTags()
  }, [])

  // Add new tag all tags and sets them to tags
  const addTag = () => {
    if (parsedNewTagName) {
      let tagCreate = { name: parsedNewTagName, tagColor: tagColor, textColor: textColor };

      API.saveTag(tagCreate)
      .then(res => {
        log && console.log("res", res);
        setNewTagName("");
        setParsedNewTagName("");
        setTagColor("#0B6EFD");
        setTextColor("#ffffff");  
        loadTags();
        handleCloseModal();
      })
      .catch(err => console.log(err));
    }
  };

    // Add new tag all tags and sets them to tags
    const editTag = () => {
      if (parsedNewTagName) {
        let tagCreate = { name: parsedNewTagName, tagColor: tagColor, textColor: textColor };
  
        API.updateTag(tagEditId, tagCreate)
        .then(res => {
          log && console.log("res", res);
          setNewTagName("");
          setParsedNewTagName("");
          setTagColor("#0B6EFD");
          setTextColor("#ffffff");  
          loadTags();
          handleCloseModal();
        })
        .catch(err => console.log(err));
      }
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
    setNewTagName(event.target.value);
    let parsedTag = event.target.value.trim().toLowerCase().replaceAll(' ', '-')
    setParsedNewTagName(parsedTag);

    // Check if tag already exists
    if (tags.find(tag => tag.name === parsedTag)) {
      setRepeatTag(true);
    } else {
      setRepeatTag(false);
    }
  };

  const handleTagSelect = (event) => {
    const tagId = event.target.dataset.tagid;
    console.log(tagId);
    setTagEditId(tagId);

    let selectedTag = (tags.find(tag => tag._id === tagId));
    setParsedNewTagName(selectedTag.name);
    setTagColor(selectedTag.tagColor);
    setTextColor(selectedTag.textColor);
  };


  return (
    <>
      <Modal.Header closeButton>
        <Row>
          <Col xs="auto">
            <Modal.Title>Edit Tags</Modal.Title>
          </Col>
          <Col>
            {customBadge(parsedNewTagName, "sampleTag", tagColor, textColor, true)}
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="newTag"
          id="add-edit-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="newTag" title="Add New Tag">
            <Form.Text>Enter a name and choose colors to create a new tag.</Form.Text>
          </Tab>
          <Tab eventKey="editTag" title="Edit Existing Tag">
            {tags.length > 0 && tags.map((tag, index) => (
              <Form.Check
                key={index}
                inline
                name="tags"
                type="radio"
                label={customBadge(tag.name, tag._id, tag.tagColor, tag.textColor)}
                data-tagid={tag._id}
                onChange={handleTagSelect} />
            ))}
          </Tab>
        </Tabs>
        <Row>
          <InputGroup hasValidation className="mb-1">
            <Form.Control
              type="text"
              placeholder="Tag Name"
              title="addTag"
              onChange={handleNewTag}
              value={newTagName}
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
              '{capitalizeName(parsedNewTagName)}' tag already exists.
            </Form.Control.Feedback>
          </InputGroup>

        </Row>

        <Row className="my-2">
          <Form.Label>Tag Colors</Form.Label>
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

          <Form.Text>Presets</Form.Text>
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

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary"
          onClick={key === "newTag" ? addTag : editTag}
        >
          Submit {key === "newTag" ? "addTag" : "editTag"}
        </Button>
      </Modal.Footer>
    </>
  )
}
export default EditTagsModal
