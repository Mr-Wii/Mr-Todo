/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Select from 'react-select'
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap'
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
        <div key={todo.id} className="editeu">
          <div className="groupInt">
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
            <div id="canOk">
              <Button
                className="awos"
                outline
                color="danger"
                onClick={() => changeEdit(todo.id)}
              >
                <i className="fas fa-times fa-lg fa-pull-left" />
                <span>Cancel</span>
              </Button>
              <Button
                className="awos"
                outline
                color="primary"
                onClick={() => updateEdit(todo.id, wiiwo, deadlineu, seL)}
              >
                <i className="fas fa-check fa-lg  fa-pull-left" />
                <span>Done</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div key={todo.id}>
          <Accordion id="btnue" className="btnnu">
            <Card border="white">
              <CustomToggle eventKey="0">
                <ListGroup style={{ margin: '0px' }} variant="flush">
                  <ListGroup.Item>
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
                      className="fas fa-eraser float-right fa-lg"
                      variant="outline-dark"
                      onClick={() => deleteTodo(todo.id)}
                      style={{
                        cursor: 'pointer',
                        marginRight: '0',
                        marginLeft: '0.7rem',
                        color: 'rgba(33, 70, 134, 0.705)'
                      }}
                    />
                    <i
                      className="fas fa-edit float-right fa-lg"
                      variant="outline-dark"
                      style={{
                        cursor: 'pointer',
                        marginRight: '0',
                        marginLeft: '0.7rem',
                        color: 'rgba(33, 70, 134, 0.705)'
                      }}
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
