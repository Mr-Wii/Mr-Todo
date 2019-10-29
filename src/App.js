import React, { Component, useState } from 'react'
import Todos from './Todos'
import AddTodo from './addForm'
import uuid from 'react-uuid'
import SortTodo from './sortTodo'
import ModalExample from './modalEx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Form } from 'react-bootstrap'

class App extends Component {
  state = {
    todos: [
      {
        content: 'Finish the Todo App',
        isInEdit: false,
        id: uuid(),
        deadline: 30 / 10 / 2019,
        creationDate: 25 / 10 / 2019,
        category: 'Work',
        isDone: true
      },
      {
        content: 'Find lit salsa',
        isInEdit: false,
        id: uuid(),
        deadline: 31 / 10 / 2019,
        creationDate: 25 / 10 / 2019,
        category: 'Personal',
        isDone: false
      },
      {
        content: 'go to gym',
        isInEdit: false,
        id: uuid(),
        deadline: 30 / 10 / 2019,
        creationDate: 25 / 10 / 2019,
        category: 'Personal',
        isDone: false
      },
      {
        content: 'Finish the Todo App styling',
        isInEdit: false,
        id: uuid(),
        deadline: 12 / 10 / 2019,
        creationDate: 25 / 10 / 2019,
        category: 'Work',
        isDone: false
      }
    ],
    filteredTodos: []
  }

  filterState = varue => {
    var updatedList = this.state.todos
    updatedList = updatedList.filter(todo => {
      const searchTextMatch = todo.content
        .toLowerCase()
        .includes(varue.toLowerCase())
      return searchTextMatch
    })
    this.setState({
      filteredTodos: updatedList
    })
  }

  deleteTodo = id => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    })
    this.setState({
      filteredTodos: todos,
      todos: todos
    })
  }

  addTodo = todo => {
    todo.id = uuid()
    let todos = [...this.state.todos, todo]
    this.setState({
      filteredTodos: todos,
      todos: todos
    })
  }

  changeEdit = id => {
    const uniqueT = this.state.todos.find(todo => {
      return todo.id === id
    })
    uniqueT.isInEdit = !uniqueT.isInEdit
    let todos = [...this.state.todos]
    this.setState({
      todos
    })
  }

  updateEdit = (id, refu, dd, seL) => {
    const uniqueT = this.state.todos.find(todo => {
      return todo.id === id
    })
    uniqueT.isInEdit = false
    uniqueT.content = refu
    uniqueT.deadline = dd
    uniqueT.category = seL
    let todos = [...this.state.todos]
    this.setState({
      todos
    })
  }

  handleCheckClick = id => {
    const uniqueT = this.state.todos.find(todo => {
      return todo.id === id
    })
    uniqueT.isDone = !uniqueT.isDone
    let todos = [...this.state.todos]
    this.setState({
      todos
    })
  }

  componentWillMount = () => {
    this.setState({ filteredTodos: this.state.todos })
  }

  render() {
    return (
      <div>
        <div>
          <Navbar>
            <Navbar.Brand href="#home">Mr Todo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Categories</Nav.Link>
              <Nav.Link href="#features">Log out</Nav.Link>
              <Nav.Link href="#pricing">About</Nav.Link>
            </Nav>
            <Form inline>
              <SortTodo
                todos={this.state.todos}
                filterState={this.filterState}
              />
            </Form>
          </Navbar>
        </div>
        <div className="wiicontainer">
          <img src={require('./bg.png')} alt="DoYourWork" />
          <div id="todoS">
            <br />
            <Todos
              todos={this.state.filteredTodos}
              deleteTodo={this.deleteTodo}
              changeEdit={this.changeEdit}
              updateEdit={this.updateEdit}
              checkChangeu={this.handleCheckClick}
            />
            <br />
            <ModalExample modalTodo={this.addTodo} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
