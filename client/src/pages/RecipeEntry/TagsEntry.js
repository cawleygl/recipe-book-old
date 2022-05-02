import React, { useState, useEffect } from "react";
import API from "../../utils/API";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { capitalizeName, badgeLabel } from "../../utils/useTools";

const TagsEntry = ({ selectedTags, handleSelectedTags }) => {

  const [tags, setTags] = useState([""]);

  const [checkedState, setCheckedState] = useState([""]);

  const [newTag, setNewTag] = useState("");
  const [parsedNewTag, setParsedNewTag] = useState("");

  const [repeatTag, setRepeatTag] = useState(false);

  useEffect(() => {
    // Load tags and create checked state array on mount
    loadTags()
  }, [])

  const addTag = () => {
    console.log("Add");
    console.log(parsedNewTag);
    createTag({ name: parsedNewTag });
    setNewTag("");
    setParsedNewTag("");
  };

  const handleNewTag = (event) => {
    setNewTag(event.target.value);
    let parsedTag = event.target.value.trim().toLowerCase().replaceAll(' ', '-')
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
        res.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
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
        <Form.Label>Tags</Form.Label>
        {tags.length > 0 && tags.map((tag, index) => (
          <Form.Check
            key={tag._id}
            type={"switch"}
            label={badgeLabel(tag.name, index, tag._id, tag.color)}
            id={tag._id}
            data-index={index}
            onChange={handleTagChange}
          />
        ))}
      </Form.Group>
      <Form.Group className="mb-3">
        <InputGroup hasValidation className="mb-3">
          <Form.Control
            type="text"
            placeholder="Add New Tag"
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
      </Form.Group>
    </>
  )
}
export default TagsEntry
