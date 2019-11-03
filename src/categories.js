import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {
  Form,
  FormControl,
  FormGroup,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import uuid from 'react-uuid'

const ModalExample1 = ({ statt }, props) => {
  const { className } = props
  const [modal, setModal] = useState(true)
  const [nestedModal, setNestedModal] = useState(false)
  const [closeAll, setCloseAll] = useState(false)
  const toggle = () => setModal(!modal)
  const toggleNested = () => {
    setNestedModal(!nestedModal)
    setCloseAll(false)
  }

  let [options, setOptions] = useState(statt.options)

  const removeCat = id => {
    const cats = options.filter(cat => {
      return cat.id !== id
    })
    setOptions(cats)
  }

  let textInput = React.createRef()

  const handleSubmit = e => {
    e.preventDefault()
    const newCat = textInput.current.value
    const newArr = { value: newCat, label: newCat, id: uuid() }
    options.push(newArr)
    setOptions(options)
  }

  const optionsList = options.map(op => {
    return (
      <div key={op.id}>
        <ListGroup variant="flush">
          <ListGroupItem action variant="light" id="lord">
            {op.value}
            <i
              className="fas fa-eraser float-right"
              variant="outline-dark"
              size="sm"
              onClick={() => removeCat(op.id)}
            />
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  })

  return (
    <div>
      <Modal
        centered
        size="lg"
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Categories</ModalHeader>
        <ModalBody>
          {optionsList}
          <Button color="success" onClick={toggleNested}>
            Add New
          </Button>
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Add New Category</ModalHeader>
            <ModalBody>
              <Form onSubmit={e => handleSubmit(e)}>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Category title"
                    ref={textInput}
                  />
                </FormGroup>
                <Button variant="primary" type="submit" onClick={toggleNested}>
                  Add New
                </Button>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ModalExample1
