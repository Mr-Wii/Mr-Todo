/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Todos from './Todos'
import SortTodo from './sortTodo'
import ModalExample from './modalEx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Form, Image } from 'react-bootstrap'
import Account from './account'
import logo from '../../assets/images/logo.png'
import Firebase, { auth } from 'firebase'
import { withAuthorization } from '../Session'
import SignOutButton from '../SignOut'

let userId

class App extends Component {
  state = {
    todos: [],
    filteredTodos: [],
    currentPage: 1,
    todosPerPage: 5
  }

  componentDidMount() {
    userId = auth().currentUser.uid
    this.getUserData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData()
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref('users/' + userId)
      .set(this.state)
  }

  getUserData = () => {
    let ref = Firebase.database().ref('users/' + userId)
    ref.on('value', snapshot => {
      const state = snapshot.val()
      this.setState(state)
    })
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
      todos,
      filteredTodos: this.state.todos
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
      todos,
      filteredTodos: this.state.todos
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
        todos,
        filteredTodos: this.state.todos
      })
    } else {
      uniqueT.textDecor = null
      this.setState({
        todos,
        filteredTodos: this.state.todos
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
        <li className="current">
          <a href="#" key={number} id={number} onClick={this.handleClick}>
            {number}
          </a>
        </li>
      )
    })

    return (
      <div id="page-container Fade">
        <div id="content-wrap">
          <Navbar sticky="top" collapseOnSelect expand="sm" bg="white">
            <Navbar.Brand as="a" href="/home">
              <Image src={logo} className="rotate-90-right-cw" />
            </Navbar.Brand>{' '}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav fill variant="tabs" id="toppu" className="mr-auto">
                <Nav.Link>
                  <Account />
                </Nav.Link>
                <Nav.Link>
                  <SignOutButton />
                </Nav.Link>
                <Nav.Link href="#About" disabled>
                  About
                </Nav.Link>
              </Nav>
              <Nav>
                <Form inline>
                  <SortTodo
                    todos={this.state.todos}
                    filterState={this.filterState}
                  />
                </Form>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="todoS">
            <ModalExample
              modalTodo={this.addTodo}
              statuu={this.state}
              filterState={this.filterState}
            />
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
            <div data-pagination>
              <ul id="page-numbers">{renderPageNumbers}</ul>
            </div>
          </div>
        </div>
        <footer id="footer">
          <p>
            Made with{' '}
            <span role="img" aria-label="heart">
              &#128156;
            </span>{' '}
            by <a href="https://github.com/Mr-Wii/">Mr-Wii</a>
          </p>
        </footer>
      </div>
    )
  }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(App)
