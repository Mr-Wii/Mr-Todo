/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Select from 'react-select'

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
        <div key={todo.id}>
          <label id="lord">
            <input
              type="checkbox"
              onChange={() => checkChangeu(todo.id)}
              checked={todo.isDone}
            />
            {todo.content}
          </label>
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
