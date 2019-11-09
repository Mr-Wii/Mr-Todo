import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddTodo from './addForm'

const ModalExample = ({ modalTodo, statuu, filterState }, props) => {
  const { className } = props

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button
        outline
        color="secondary"
        className="pulsate-fwd"
        onClick={toggle}
      >
        Add Task <i className="far fa-plus-square"></i>
      </Button>
      <Modal
        centered
        size="md"
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Add a new task</ModalHeader>
        <ModalBody>
          <AddTodo
            addTodo={modalTodo}
            togguru={toggle}
            todos={statuu.todos}
            optionsu={statuu.options}
            filtodos={filterState}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ModalExample
