/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Select from 'react-select'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import {
  ListGroup,
  Form,
  Accordion,
  Card,
  useAccordionToggle
} from 'react-bootstrap'

const Todos = ({
  todos,
  stata,
  deleteTodo,
  changeEdit,
  updateEdit,
  checkChangeu,
  options
}) => {
  const indexOfLastTodo = stata.currentPage * stata.todosPerPage
  const indexOfFirstTodo = indexOfLastTodo - stata.todosPerPage
  const currentTodos = stata.filteredTodos.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  )

  const todoList = currentTodos.length ? (
    currentTodos.map(todo => {
      let contentu = todo.content
      const deadlin = todo.deadline
      const creationDateu = todo.creationDate
      const cattt = todo.category
      let wiiwo = todo.content
      let deadlineu = todo.deadline
      let seL = todo.category
      function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionToggle(eventKey, () => '')
        return <div onClick={decoratedOnClick}>{children}</div>
      }
      return todo.isInEdit ? (
        <div key={todo.id} className="shadow p-3 mb-2 bg-white rounded">
          <InputGroup>
            <InputGroupAddon addonType="prepend">Title </InputGroupAddon>
            <Input
              defaultValue={todo.content}
              onChange={evt => {
                wiiwo = evt.target.value
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Deadline</InputGroupAddon>
            <Input
              type="date"
              placeholder="Deadline:"
              onChange={evt => {
                deadlineu = evt.target.value
              }}
            />
          </InputGroup>
          <Select
            defaultInputValue={todo.category}
            defaultValue={todo.category}
            value={todo.category}
            onChange={evt => {
              seL = evt.value
            }}
            options={options}
            placeholder="Category"
          />

          <i
            className="fas fa-ban"
            size="sm"
            onClick={() => changeEdit(todo.id)}
          />
          <i
            className="far fa-check-square"
            size="sm"
            onClick={() => updateEdit(todo.id, wiiwo, deadlineu, seL)}
          />
        </div>
      ) : (
        <div key={todo.id} className="shadow-drop-2-bottom">
          <Accordion className="shadow p-3 mb-2 bg-white rounded">
            <Card border="white">
              <CustomToggle eventKey="0">
                <ListGroup style={{ margin: '0px' }} variant="flush">
                  <ListGroup.Item id="lord">
                    <Form.Check
                      inline
                      type="checkbox"
                      onChange={() => {
                        checkChangeu(todo.id)
                      }}
                      checked={todo.isDone}
                    ></Form.Check>
                    <span className={todo.textDecor} id="lineT">
                      {contentu}
                    </span>
                    <i
                      className="fas fa-eraser float-right"
                      variant="outline-dark"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                    />
                    <i
                      className="fas fa-edit float-right"
                      variant="outline-dark"
                      size="sm"
                      onClick={() => changeEdit(todo.id)}
                    />
                  </ListGroup.Item>
                </ListGroup>{' '}
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <b>Deadline :</b> {deadlin} <br />
                    <b>Creation date :</b> {creationDateu} <br />
                    <b>Category :</b> {cattt}
                  </Card.Body>
                </Accordion.Collapse>{' '}
              </CustomToggle>
            </Card>
          </Accordion>
        </div>
      )
    })
  ) : (
    <div className="shaddiv">
      <img
        className="wowow"
        src={require('../assets/images/nothing.png')}
        alt="empty"
      />
      <h1 style={{ color: 'purple' }}>Could not find any todos :(</h1>
    </div>
  )

  return <div>{todoList}</div>
}

export default Todos
