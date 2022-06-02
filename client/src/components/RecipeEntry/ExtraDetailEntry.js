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

const ExtraDetailsEntry = ({ allTags, setAllTags, selectedTags, setSelectedTags, setRecipeNotes }) => {
  let log = true;

  const [loadedTags, setLoadedTags] = useState([""]);

  useEffect(() => {
    async function initalLoadTags() {
      try {
        let tagsRes = await API.getTags()

        // add selectedState boolean (set to false)
        tagsRes.data.forEach(tag => tag.selectedState = false);
        log && console.log("Loaded Tags:", tagsRes);

        // Set to loaded tags state variable
        setLoadedTags(tagsRes.data);

      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
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
    let loadedTagsArray = [...loadedTags];

    const checkedTag = loadedTagsArray[index]

    // Check, adding ID to array
    if (checkedTag.selectedState === false) {
      // Push ID from checked tag to selectedTags array
      selectedTagsArray.push(checkedTag._id)
      setSelectedTags(selectedTagsArray);
      // Change its boolean value of checked tag in All Tags array
      loadedTagsArray[index].selectedState = true;

      // Uncheck, removing ID from array
    } else {
      // Filter selected ID from selectedTags array
      setSelectedTags(selectedTagsArray.filter(tagId => tagId !== id));
      // Change its boolean value of checked tag in All Tags array
      loadedTagsArray[index].selectedState = false;
    }
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
                {loadedTags && loadedTags.map((tag, index) => (
                  <Form.Check
                    key={tag._id}
                    inline
                    type="switch"
                    label={customBadge(tag.name, tag._id, tag.tagColor, tag.textColor)}
                    id={tag._id}
                    data-index={index}
                    checked={loadedTags[index].selectedState}
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
              tags={loadedTags}
              setShowModal={setShowModal}
              loadedTags={loadedTags}
              setLoadedTags={setLoadedTags}
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
