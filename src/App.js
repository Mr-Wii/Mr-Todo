import React, { Component } from 'react'
import Todos from './Todos'
import uuid from 'react-uuid'
import SortTodo from './sortTodo'
import ModalExample from './modalEx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Form } from 'react-bootstrap'
import ModalExample1 from './categories'

class App extends Component {
  state = {
    todos: [
      {
        content: 'Finish the Todo App',
        isInEdit: false,
        id: uuid(),
        deadline: '30-10-2019',
        creationDate: '25-10-2019',
        category: 'Work',
        isDone: true
      },
      {
        content: 'Find lit salsa',
        isInEdit: false,
        id: uuid(),
        deadline: '31 / 10 / 2019',
        creationDate: '25 / 10 / 2019',
        category: 'Personal',
        isDone: false
      }
    ],
    filteredTodos: [],
    currentPage: 1,
    todosPerPage: 6,
    render: false,
    options: [
      { value: 'Work', label: 'Work', id: 0 },
      { value: 'Personal', label: 'Personal', id: 1 },
      { value: 'Other', label: 'Other', id: 2 }
    ]
  }

  add = () => {
    this.setState({ render: !this.state.render })
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
    let todos = todo
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

  UNSAFE_componentWillMount = () => {
    this.setState({ filteredTodos: this.state.todos })
  }
  render() {
    return (
      <div>
        <div>
          <Navbar>
            <Navbar.Brand href="/home">Mr Todo</Navbar.Brand>
            <Nav fill variant="tabs" className="mr-auto">
              <Nav.Link onClick={() => this.add()}>Categories</Nav.Link>
              {this.state.render && <ModalExample1 statt={this.state} />}
              <Nav.Link href="#logOut" disabled>
                Log out
              </Nav.Link>
              <Nav.Link href="#About" disabled>
                About
              </Nav.Link>
            </Nav>
            <Form inline>
              <SortTodo
                todos={this.state.todos}
                filterState={this.filterState}
              />
            </Form>
          </Navbar>
        </div>
        <div id="todoS">
          <ModalExample
            modalTodo={this.addTodo}
            todos={this.state.todos}
            filterState={this.filterState}
          />
          <br />
          <br />
          <Todos
            todos={this.state.filteredTodos}
            deleteTodo={this.deleteTodo}
            changeEdit={this.changeEdit}
            updateEdit={this.updateEdit}
            checkChangeu={this.handleCheckClick}
          />
        </div>
        <div className="footer">
          <p>
            Made with &#128156; by{' '}
            <a href="https://github.com/Mr-Wii/">Mr-Wii</a>
          </p>
        </div>
      </div>
    )
  }
}

export default App
