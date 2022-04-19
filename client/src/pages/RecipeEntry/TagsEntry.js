import React, { useState, useEffect } from "react";
import API from "../../utils/API";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { capitalizeName } from "../../utils/useTools";

const TagsEntry = () => {

  const [tags, setTags] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([""]);

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
    createTag({name: parsedNewTag});
    loadTags()
  };

  const handleNewTag = (event) => {
    setNewTag(event.target.value);
    const parsedTag = event.target.value.trim().toLowerCase()
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
      setSelectedTags(arrayvalue);

      // If setting to false, find ID and splice
    } else {
      const removed = arrayvalue.filter(tagId => tagId !== id);
      setSelectedTags(removed);
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
        setTags(res.data)
        setCheckedState(new Array(res.data.length).fill(false));
      }
      )
      .catch(err => console.log(err));
  };
  // Add new tag all tags and sets them to tags
  function createTag(tag) {
    API.saveTag(tag)
      .then(res => {
        console.log("res", res);
        setTags(res.data)
      }
      )
      .catch(err => console.log(err));
  };


  return (
    <>
      <h4 className="my-3">Tags</h4>
      {/* <p className="my-3">{tags && JSON.stringify(tags)}</p>
      <p className="my-3">{newTag && JSON.stringify(newTag)}</p>
      <p className="my-3">{parsedNewTag && JSON.stringify(parsedNewTag)}</p>
      <p className="my-3">{selectedTags && JSON.stringify(selectedTags)}</p>
      <p className="my-3">{checkedState && JSON.stringify(checkedState)}</p> */}

      <Form>
        <Row>
          <Col xs="auto">
            <InputGroup className="mb-3">
              {tags.length > 0 && tags.map((tag, index) => (
                <div key={tag._id} className="mb-3">
                  <Form.Check
                    inline
                    type={"switch"}
                    id={tag._id}
                    data-index={index}
                    label={capitalizeName(tag.name)}
                    onChange={handleTagChange}
                  />
                </div>
              ))}
            </InputGroup>
          </Col>
          <Col xs="auto">
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

          </Col>
        </Row>
      </Form>
    </>
  )
}
export default TagsEntry
