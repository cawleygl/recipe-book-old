import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "../style.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import EditTagsModal from "./EditTagsModal";

import { customBadge } from "../../utils/useTools";

const ExtraDetailsEntry = ({ selectedTags, setSelectedTags, setRecipeNotes }) => {
  let log = true;

  const [allTags, setAllTags] = useState([""]);

  useEffect(() => {
    async function initalLoadTags() {
      // Load tags from db 
      const response = await API.getTags();

      // add selectedState boolean (set to false)
      response.forEach(tag => tag.selectedState = false);

      // Sort alphabetically by name
      response.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

      // Set to state variable
      setAllTags(response);
    }
    initalLoadTags();
  }, [])


  // Tag Modal
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  const handleTagChange = (event) => {
    const id = event.target.id;
    const index = event.target.dataset.index;

    const selectedTagsArray = [...selectedTags];
    let allTagsArray = [...allTags];

    const checkedTag = allTagsArray[index]

    // If selectedState === false, setting to true
    if (checkedTag.selectedState === false) {
      // Push ID from checked tag to selectedTags array
      selectedTagsArray.push(checkedTag._id)
      setSelectedTags(selectedTagsArray);

      // Change its boolean value of checked tag in All Tags array
      allTagsArray[index].selectedState = true;

      // Else (If selectedState === true, setting to false)
    } else {
      // Filter selected ID from selectedTags array
      setSelectedTags(selectedTagsArray.filter(tagId => tagId !== id));

      // Change its boolean value of checked tag in All Tags array
      allTagsArray[index].selectedState = false;

    }
  };

  const refreshCheckedState = (response) => {
    // setCheckedState(Array.from(response, tag => ({ id: tag._id, state: false })));
  };

  const maintainCheckedState = (response) => {
    // setCheckedState(Array.from(response, tag => ({ id: tag._id, state: false })));
  }
  return (
    <>
      <Row>
        {allTags.length > 0 && allTags.map((tag) => (
          <div>{JSON.stringify(tag, null, 2)}</div>
        ))}
        <p>{JSON.stringify(selectedTags)}</p>

      </Row>
      <Row>
        <Col sm={6} className="mb-3">
          <Form.Group className="mb-3">
            <Row>
              <Form.Label>Tags</Form.Label>
            </Row>
            <Row>
              <Col>
                {allTags.length > 0 && allTags.map((tag, index) => (
                  <Form.Check
                    key={tag._id}
                    inline
                    type="switch"
                    label={customBadge(tag.name, tag._id, tag.tagColor, tag.textColor)}
                    id={tag._id}
                    data-index={index}
                    checked={allTags[index].selectedState}
                    onChange={handleTagChange} />
                ))}
              </Col>
            </Row>
            <Form.Text>Select any tag that describes this dish to add it.</Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={handleShowModal}>
            Add / Edit Tags
          </Button>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <EditTagsModal
              tags={allTags}
              setShowModal={setShowModal}
              allTags={allTags}
              setAllTags={setAllTags}
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
