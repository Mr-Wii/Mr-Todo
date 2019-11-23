import React, { Component } from 'react'
import { Form, FormControl, FormGroup } from 'react-bootstrap'
import { Button } from 'reactstrap'

import uuid from 'react-uuid'

class AddTodo extends Component {
  state = [...this.props.todos]

  setDate = () => {
    const d = new Date(),
      dformat =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
    return dformat
  }

  handleSubmit = e => {
    e.preventDefault()
    const tit = this.el.value
    const dt = this.el1.value
    const catg = this.el2.value
    const ewe = this.setDate()
    const newArr = {
      content: tit,
      isInEdit: false,
      id: uuid(),
      deadline: dt,
      creationDate: ewe,
      category: catg,
      isDone: false,
      textDecor: null
    }

    const stateuu = this.state
    stateuu.unshift(newArr)
    this.setState(stateuu)
    this.props.addTodo(this.state)
    this.props.togguru()
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} data-toggle="validator">
          <FormGroup>
            <FormControl
              required
              type="text"
              placeholder="Task Title"
              ref={el => (this.el = el)}
              value={this.state.content}
              style={{ marginBottom: '4px' }}
            />
            <FormControl
              required
              type="date"
              placeholder="Deadline"
              ref={el1 => (this.el1 = el1)}
              defaultValue=""
              style={{ marginBottom: '4px' }}
            />
            <FormControl
              required
              type="text"
              placeholder="Category"
              ref={el2 => (this.el2 = el2)}
              value={this.state.category}
              style={{ marginBottom: '4px' }}
            />
          </FormGroup>
          <Button outline color="info" type="submit">
            Add a new Todo
          </Button>
        </Form>
      </div>
    )
  }
}

export default AddTodo
