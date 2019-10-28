/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Select from 'react-select'
import './styles.css'

const options = [
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Other', label: 'Other' }
]

let wiiwo
let deadlineu
let seL

const Todos = ({ todos, deleteTodo, changeEdit, updateEdit }) => {
  const todoList = todos.length ? (
    todos.map(todo => {
      return todo.isInEdit ? (
        <div key={todo.id}>
          <input
            onChange={evt => {
              wiiwo = evt.target.value
            }}
            type="text"
            defaultValue={todo.content}
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
        <div key={todo.id}>
          <span>{todo.content}</span>
          <button
            className="material-icons right"
            onClick={() => deleteTodo(todo.id)}
          >
            delete
          </button>
          <button
            onClick={() => changeEdit(todo.id)}
            className="material-icons right"
          >
            edit
          </button>
        </div>
      )
    })
  ) : (
    <p className="center">You have no todos left</p>
  )

  return <div>{todoList}</div>
}

export default Todos
