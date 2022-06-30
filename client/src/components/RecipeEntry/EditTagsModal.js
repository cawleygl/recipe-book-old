import React, { useState } from "react";
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

import { capitalizeName, customBadge, colorButton } from "../../hooks/useTools";

const EditTagsModal = ({ tags, setShowModal, loadedTags, setLoadedTags }) => {
  let log = true;

  //Tab state
  const [key, setKey] = useState('newTag');

  const [newTagName, setNewTagName] = useState("");
  const [parsedNewTagName, setParsedNewTagName] = useState("tag-name");

  const [tagEdit, setTagEdit] = useState("");

  const [tagColor, setTagColor] = useState("#0B6EFD");
  const [textColor, setTextColor] = useState("#ffffff");

  const [repeatTag, setRepeatTag] = useState(false);

  const loadTagChanges = async () => {
    // Destructure All Tags array (current loaded tags)
    let loadedTagsArray = [...loadedTags];

    // Load tags from DB, including new changes
    try {
      let newTagLoad = [];

      const loadRes = await API.getTags();
      log && console.log("Updated Tags Response", loadRes);
      // Parse through loaded tags and add selectedState values where present in All Tags array
      loadRes.data.forEach(dbTag => {
        const currentTag = loadedTagsArray.find(loadedTag => loadedTag._id === dbTag._id);
        let newTag = dbTag;

        if (currentTag) newTag.selectedState = currentTag.selectedState;
        else newTag.selectedState = false;

        newTagLoad.push(newTag);
        // Set DB tags with current selectedState values to state

      });

      setLoadedTags(newTagLoad);

    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  // Add new tag all tags and sets them to tags
  const addTag = async () => {
    if (parsedNewTagName) {
      let tagCreate = { name: parsedNewTagName, tagColor: tagColor, textColor: textColor };

      try {
        // Add new tag to DB
        await API.saveTag(tagCreate);

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
    if (parsedNewTagName && tagEdit) {
      let tagCreate = { name: parsedNewTagName, tagColor: tagColor, textColor: textColor };
      try {
        // Update tag in DB
        await API.updateTag(tagEdit._id, tagCreate);

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
    if (tagEdit) {
      try {
        // Update tag in DB
        await API.deleteTag(tagEdit._id);

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

  const handleColorButton = (event) => {

    const tag = event.target.closest('button').dataset.tagcolor;
    const text = event.target.closest('button').dataset.textcolor;

    setTagColor(tag);
    setTextColor(text);

  };

  const handleNewTag = (event) => {
    setNewTagName(event.target.value);
    // Set parsed tag name value
    let parsedTagName = event.target.value.trim().toLowerCase();
    setParsedNewTagName(parsedTagName);

    // Check if tag already exists
    if (!tags.find(tag => tag.name === parsedTagName)) {
      setRepeatTag(false);
    } else {
      // Don't activate if editing tag of the same name
      if (tagEdit.name === parsedTagName) {
        setRepeatTag(false);
      } else {
        setRepeatTag(true);
      }
    }
  };

  const handleTagSelect = (event) => {
    const tagId = event.target.dataset.tagid;
    const tagEdit = tags.find(tag => tag._id === tagId)
    console.log(tagId, tagEdit);
    setTagEdit(tagEdit);
    setParsedNewTagName(tagEdit.name);
    setNewTagName(tagEdit.name);
    setTagColor(tagEdit.tagColor);
    setTextColor(tagEdit.textColor);
  };

  return (
    <>
      <Modal.Header>
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
              <Form.Text>Select a tag and submit changes below.</Form.Text>
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
                onChange={(event) => setTagColor(event.target.value)}
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
                onChange={(event) => setTextColor(event.target.value)}
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
