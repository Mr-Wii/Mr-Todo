import React, { Component } from 'react'
import Todos from './components/Todos'
import uuid from 'react-uuid'
import SortTodo from './components/sortTodo'
import ModalExample from './components/modalEx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Form } from 'react-bootstrap'
import ModalExample1 from './components/categories'

class App extends Component {
  state = {
    todos: [
      {
        content: 'Finish the Todo App',
        isInEdit: false,
        id: uuid(),
        deadline: '2019-12-5',
        creationDate: '11/9/2019 15:9:34',
        category: 'Work',
        isDone: false,
        textDecor: null
      },
      {
        content: 'Find lit salsa',
        isInEdit: false,
        id: uuid(),
        deadline: '2019-12-3',
        creationDate: '11/9/2019 15:9:34',
        category: 'Personal',
        isDone: false,
        textDecor: null
      }
    ],
    filteredTodos: [],
    options: [
      { value: 'Work', label: 'Work', id: uuid() },
      { value: 'Personal', label: 'Personal', id: uuid() },
      { value: 'Other', label: 'Other', id: uuid() }
    ],
    filteredOptions: [],
    currentPage: 1,
    todosPerPage: 5
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    })
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

    let todos = [...this.state.todos]
    uniqueT.isDone = !uniqueT.isDone
    if (uniqueT.isDone) {
      uniqueT.textDecor = 'strike'
      this.setState({
        todos
      })
    } else {
      uniqueT.textDecor = null
      this.setState({
        todos
      })
    }
  }

  UNSAFE_componentWillMount = () => {
    this.setState({ filteredTodos: this.state.todos })
  }

  render() {
    const pageNumbers = []
    for (
      let i = 1;
      i <= Math.ceil(this.state.filteredTodos.length / this.state.todosPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick} className="">
          {number}
        </li>
      )
    })
    return (
      <div>
        <div className="containerS">
          <Navbar>
            <Navbar.Brand href="/home">Mr Todo</Navbar.Brand>
            <Nav fill variant="tabs" className="mr-auto">
              <Nav.Link>
                <ModalExample1 statt={this.state} />
              </Nav.Link>
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
          <div className="todoS">
            <ModalExample
              modalTodo={this.addTodo}
              statuu={this.state}
              filterState={this.filterState}
            />
            <br />
            <br />
            <Todos
              className="todosu"
              stata={this.state}
              todos={this.state.filteredTodos}
              options={this.state.options}
              deleteTodo={this.deleteTodo}
              changeEdit={this.changeEdit}
              updateEdit={this.updateEdit}
              checkChangeu={this.handleCheckClick}
            />
            <div className="flex">
              {' '}
              <ul id="page-numbers">{renderPageNumbers}</ul>
            </div>
          </div>
          <div className="footer">
            <p>
              Made with{' '}
              <span role="img" aria-label="heart">
                &#128156;
              </span>{' '}
              by <a href="https://github.com/Mr-Wii/">Mr-Wii</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default App
