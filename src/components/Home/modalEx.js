import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddTodo from './addForm'

const ModalExample = ({ modalTodo, statuu, filterState }, props) => {
  const { className } = props

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <button id="btnu" className="btn-pill" onClick={toggle}>
        <span>Add Todo</span>
      </button>
      <Modal
        centered
        size="md"
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>New Todo</ModalHeader>
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
