import React, { Component } from 'react'
import Todos from './Todos'
import AddTodo from './addForm'
import uuid from 'react-uuid'

class App extends Component {
  state = {
    todos: [
      {
        content: 'Finish the Todo App',
        isInEdit: false,
        id: uuid(),
        deadline: 30 / 10 / 2019,
        creationDate: 25 / 10 / 2019,
        category: 'Work'
      }
    ]
  }

  constructor(props) {
    super(props)
    this.domElem = React.createRef()
  }

  deleteTodo = id => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    })
    this.setState({
      todos
    })
  }

  addTodo = todo => {
    todo.id = uuid()
    let todos = [...this.state.todos, todo]
    this.setState({
      todos
    })
  }

  changeEdit = id => {
    const todos = this.state.todos.find(todo => {
      return todo.id === id
    })
    todos.isInEdit = !todos.isInEdit
    let wiwo = [...this.state.todos]
    this.setState({
      wiwo
    })
  }

  updateEdit = (id, refu, dd, seL) => {
    const todos = this.state.todos.find(todo => {
      return todo.id === id
    })
    todos.isInEdit = false
    todos.content = refu
    todos.deadline = dd
    todos.category = seL
    let wiwo = [...this.state.todos]
    this.setState({
      wiwo
    })
  }

  render() {
    return (
      <div className="wiicontainer">
        <img src={require('./bg.png')} alt="DoYourWork" />
        <div id="todoS">
          <h1 className="center blue-text">Mr Todo</h1>
          <Todos
            todos={this.state.todos}
            deleteTodo={this.deleteTodo}
            changeEdit={this.changeEdit}
            updateEdit={this.updateEdit}
          />
          <AddTodo addTodo={this.addTodo} />
        </div>
      </div>
    )
  }
}

export default App
