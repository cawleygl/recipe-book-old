import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "../style.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import DropdownButton from 'react-bootstrap/DropdownButton'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import EditTagsModal from "./EditTagsModal";

import { capitalizeName, customBadge, colorButton } from "../../utils/useTools";

const ExtraDetailsEntry = ({ selectedTags, setSelectedTags, setRecipeNotes }) => {
  let log = false;

  const [tags, setTags] = useState([""]);
  const [checkedState, setCheckedState] = useState([""]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  useEffect(() => {
    // Load tags and create checked state array on mount
    loadTags()
  }, [])


  const handleTagChange = (event) => {
    const index = parseInt(event.target.dataset.index);
    const id = event.target.id;
    const arrayvalue = [...selectedTags];

    // If setting checked to true, push ID to array 
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
        log && console.log("res", res);
        res.data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        setTags(res.data);
        setCheckedState(new Array(res.data.length).fill(false));
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Row>
        <Col sm={6} className="mb-3">
          <Form.Group className="mb-3">
            <Row>
              <Form.Label>Tags</Form.Label>
            </Row>
            <Row>
              <Col>
                {tags.length > 0 && tags.map((tag, index) => (
                  <Form.Check
                    key={index}
                    inline
                    type="switch"
                    label={customBadge(tag.name, tag._id, tag.tagColor, tag.textColor)}
                    id={tag._id}
                    data-index={index}
                    onChange={handleTagChange} />
                ))}
              </Col>
            </Row>
            <Form.Text>Select any tag that describes this dish to add it.</Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={handleShowModal}>
            Add / Edit Tags
          </Button>
          <Modal show={showModal} onHide={handleCloseModal}>
            <EditTagsModal
              tags={tags}
              setTags={setTags}
              loadTags={loadTags}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              handleCloseModal={handleCloseModal}
            />
          </Modal>
        </Col>

        <Col sm={6}>
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Notes"
              onChange={(event) => setRecipeNotes(event.target.value)}
              aria-label="Text input recipe notes"
              aria-describedby="recipe-notes-entry" />
            <Form.Text>Add any important reminders or additional information about this dish here.</Form.Text>
          </Form.Group>
        </Col>
      </Row>
    </>
  )
}
export default ExtraDetailsEntry
