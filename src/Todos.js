/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Select from 'react-select'

import { ListGroup, ListGroupItem, Form } from 'react-bootstrap'

const options = [
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Other', label: 'Other' }
]

let wiiwo
let deadlineu
let seL

const Todos = ({ todos, deleteTodo, changeEdit, updateEdit, checkChangeu }) => {
  const todoList = todos.length ? (
    todos.map(todo => {
      return todo.isInEdit ? (
        <div key={todo.id}>
          <input
            type="text"
            defaultValue={todo.content}
            onChange={evt => {
              wiiwo = evt.target.value
            }}
          />
          <input
            type="date"
            placeholder="Deadline:"
            onChange={evt => {
              deadlineu = evt.target.value
            }}
            defaultValue={todo.deadline}
          />
          <Select
            defaultValue={todo.category}
            value={todo.category}
            onChange={evt => {
              seL = evt.value
            }}
            options={options}
            placeholder="Category"
          />
          <button
            className=" material-icons "
            onClick={() => changeEdit(todo.id)}
          >
            close
          </button>
          <button
            className=" material-icons "
            onClick={() => updateEdit(todo.id, wiiwo, deadlineu, seL)}
          >
            check
          </button>
        </div>
      ) : (
        <div className="shadow-drop-2-bottom" key={todo.id}>
          <ListGroup
            className="shadow p-3 mb-2 bg-white rounded"
            variant="flush"
          >
            <ListGroupItem id="lord">
              <Form.Check
                inline
                type="checkbox"
                onChange={() => checkChangeu(todo.id)}
                checked={todo.isDone}
              ></Form.Check>
              {todo.content}

              <i
                class="fas fa-eraser float-right"
                variant="outline-dark"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
              />
              <i
                class="fas fa-edit float-right"
                variant="outline-dark"
                size="sm"
                onClick={() => changeEdit(todo.id)}
              />
            </ListGroupItem>
          </ListGroup>
        </div>
      )
    })
  ) : (
    <p className="center">You have no todos left</p>
  )

  return <div>{todoList}</div>
}

export default Todos
