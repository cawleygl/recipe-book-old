import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "../style.css"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import EditTagsModal from "./EditTagsModal";

import { customBadge } from "../../hooks/useTools";

const ExtraDetailsEntry = ({ handleChange, values, errors, allTags, setAllTags, loadedTags, selectedTags, setSelectedTags, setRecipeNotes }) => {
  // Tag Modal
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Col sm={4} className="mb-3">
        <Form.Group className="mb-3">
          <Row>
            <Form.Label>Tags</Form.Label>
          </Row>
          <Row>
            <Col>
              {loadedTags && loadedTags.map((tag, index) => (
                <Form.Check
                  key={index}
                  inline
                  name='tag'
                  type="switch"
                  label={customBadge(tag.name, tag._id, tag.tagColor, tag.textColor)}
                  value={tag._id}
                  checked={loadedTags[index].selectedState}
                  onChange={handleChange} />
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
          // setLoadedTags={setLoadedTags}
          />
        </Modal>
      </Col>

      <Col>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="recipe-notes"
            label="Notes"
          >
            <Form.Control
              as="input"
              name="notes"
              onChange={handleChange}
              value={values.notes}
              placeholder="Notes"
              aria-label="Text input recipe notes"
              aria-describedby="recipe-notes-entry" />
          </FloatingLabel>
          <Form.Text>Add any important reminders or additional information about this dish here.</Form.Text>
        </Form.Group>
      </Col>
    </>
  )
}
export default ExtraDetailsEntry
