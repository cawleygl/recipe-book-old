import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import CloseButton from 'react-bootstrap/CloseButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

import { handleEnterKeyDown } from "../../hooks/useTools";

import '../../components/style.css'

const DirectionEntry = ({ handleChange, values, errors, touched, addErrors, currentStep, handleSelect, handleAdd, handleDelete, handleToggle }) => {

  return (
    <>
      <Form.Group className='mb-3'>
        <Form.Label>Directions</Form.Label>
        <InputGroup data-name="directions">
        <OverlayTrigger
            placement="top"
            trigger="focus"
            show={addErrors.directions}
            onToggle={(event) => handleToggle(event, 'directions')}
            overlay={
              <Popover id={`popover-positioned-top`}>
                <Popover.Header as="h3">{`Missing Info`}</Popover.Header>
                <Popover.Body>
                  Direction Body
                </Popover.Body>
              </Popover>
            }
          >

          <FloatingLabel
            controlId="floatingTextarea"
            label={`Step ${currentStep + 1}`}
            style={{ width: 'calc(100% - 40px)' }}
          >
            <Form.Control
              as="textarea"
              name="directions"
              isInvalid={errors.directions && touched.directions}
              onChange={handleChange}
              value={values.directions[currentStep]}
              aria-label="Text input recipe directions"
              aria-describedby="recipe-direction-entry"
              onKeyDown={(event) => handleEnterKeyDown(event, handleAdd)}
            />
          </FloatingLabel>
          </OverlayTrigger>

          <Button onClick={handleAdd} name="directions" variant="outline-primary" id="add-step-button" >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InputGroup>
        <Form.Text>{errors.directions && touched.directions ? errors.directions : null}</Form.Text>
      </Form.Group>

      <Table striped bordered hover style={{ width: '100%', wordBreak: 'break-word' }}>
        <thead>
          <tr>
            <th>Directions - Click to Edit</th>
          </tr>
        </thead>
        <tbody data-name="directions">
          {values.directions.map((direction, index) => (
            <tr key={index} data-index={index} onClick={handleSelect}>
              <td>
                <Row>
                  <Col className='btn-close-column' xs='auto'>
                    <CloseButton data-index={index} onClick={handleDelete} />
                  </Col>
                  <Col className='ms-2'>
                    {index + 1}. {direction}
                  </Col>
                </Row>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
export default DirectionEntry;
