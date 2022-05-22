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

const EditTagsModal = ({ tags, setShowModal, allTags, setAllTags }) => {
  let log = true;

  //Tab state
  const [key, setKey] = useState('newTag');

  const [newTagName, setNewTagName] = useState("");
  const [parsedNewTagName, setParsedNewTagName] = useState("tag-name");
  const [tagEditId, setTagEditId] = useState("");

  const [tagColor, setTagColor] = useState("#0B6EFD");
  const [textColor, setTextColor] = useState("#ffffff");

  const [repeatTag, setRepeatTag] = useState(false);

  const loadTagChanges = async () => {
    // Destructure All Tags array (current loaded tags)
    let allTagsArray = [...allTags];
    log && console.log("allTagsArray", allTagsArray);

    // Load tags from DB, including new changes
    const loadRes = await API.getTags();
    log && console.log("loadRes", loadRes);

    // Parse through loaded tags and add selectedState values where present in All Tags array
    let newTagLoad = [];
    loadRes.forEach(dbTag => {
      const currentTag = allTagsArray.find(allTag => allTag._id === dbTag._id);

      let newTag = dbTag;
      if (currentTag) newTag.selectedState = currentTag.selectedState;
      else newTag.selectedState = false;
      newTagLoad.push(newTag);
    });
    // Set DB tags with current selectedState values to state
    setAllTags(newTagLoad);
  };

  // Add new tag all tags and sets them to tags
  const addTag = async () => {
    if (parsedNewTagName) {
      let tagCreate = { name: parsedNewTagName, tagColor: tagColor, textColor: textColor };

      try {
        // Add new tag to DB
        const submitRes = await API.saveTag(tagCreate);
        log && console.log("submitRes", submitRes);

        // Reset Tag Parameters
        setNewTagName("");
        setParsedNewTagName("");
        setTagColor("#0B6EFD");
        setTextColor("#ffffff");

        // Load tags from DB and carry over selectedState values by ID
        loadTagChanges();

        // Close Modal
        setShowModal(false);

      } catch (err) {
        // Handle Error Here
        console.error(err);
      }

    }
  };

  // Add new tag all tags and sets them to tags
  const editTag = async () => {
    if (parsedNewTagName && tagEditId) {
      let tagCreate = { name: parsedNewTagName, tagColor: tagColor, textColor: textColor };
      try {
        // Update tag in DB
        const updateRes = await API.updateTag(tagEditId, tagCreate);
        log && console.log("updateRes", updateRes);

        // Reset Tag Parameters
        setNewTagName("");
        setParsedNewTagName("");
        setTagColor("#0B6EFD");
        setTextColor("#ffffff");

        // Load tags from DB and carry over selectedState values by ID
        loadTagChanges();

        // Close Modal
        setShowModal(false);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
  };

  // Delete tag 
  const removeTag = async () => {
    if (tagEditId) {
      try {
        // Update tag in DB
        const deleteRes = await API.deleteTag(tagEditId);
        log && console.log("deleteRes", deleteRes);

        // Reset Tag Parameters
        setNewTagName("");
        setParsedNewTagName("");
        setTagColor("#0B6EFD");
        setTextColor("#ffffff");

        // Load tags from DB and carry over selectedState values by ID
        loadTagChanges();

        // Close Modal
        setShowModal(false);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
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
          <Col className="pt-1">
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
            <Row>
              <Form.Text>Select a tab and submit changes below.</Form.Text>
            </Row>
            <Row>
              <Col className="mb-3">
                {tags && tags.map((tag, index) => (
                  <Form.Check
                    key={index}
                    inline
                    name="tags"
                    type="radio"
                    label={customBadge(tag.name, tag._id, tag.tagColor, tag.textColor)}
                    data-tagid={tag._id}
                    onChange={handleTagSelect} />
                ))}
              </Col>
            </Row>
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
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        {key === "editTag" ?
          <Button variant="danger"
            onClick={removeTag}
          >
            Delete {parsedNewTagName !== 'tag-name' ? ("'" + capitalizeName(parsedNewTagName) + "' Tag") : 'Tag'}
          </Button>
          : null}
        <Button variant="primary"
          onClick={key === "newTag" ? addTag : editTag}
          disabled={repeatTag}
        >
          {key === "newTag" ? "Create New Tag" : "Submit Changes"}
        </Button>
      </Modal.Footer>
    </>
  )
}
export default EditTagsModal
