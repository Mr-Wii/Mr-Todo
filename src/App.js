import React, { Component } from 'react'
import Todos from './Todos'
import AddTodo from './addForm'

class App extends Component {
  state = {
    todos: [{ id: 1, content: 'succ' }, { id: 2, content: 'succ x2' }]
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
    todo.id = Math.random()
    let todos = [...this.state.todos, todo]
    this.setState({
      todos
    })
  }
  render() {
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Mr-Todos</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo}></Todos>
        <AddTodo addTodo={this.addTodo}></AddTodo>
      </div>
    )
  }
}

export default App
