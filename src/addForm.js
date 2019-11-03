import React, { Component } from 'react'
import Select from 'react-select'
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap'
import uuid from 'react-uuid'

const options = [
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Other', label: 'Other' }
]

class AddTodo extends Component {
  state = this.props.todos

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
    const catg = this.el2.state.value.value
    const ewe = this.setDate()
    const newArr = {
      content: tit,
      isInEdit: false,
      id: uuid(),
      deadline: dt,
      creationDate: ewe,
      category: catg,
      isDone: false
    }

    const stateuu = this.state
    stateuu.unshift(newArr)
    this.setState(stateuu)
    this.props.addTodo(this.state)
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Task Title"
              ref={el => (this.el = el)}
              value={this.state.content}
            />
            <FormControl
              type="date"
              placeholder="Deadline"
              ref={el1 => (this.el1 = el1)}
              value={this.state.deadline}
            />
            <Select
              options={options}
              placeholder="Category"
              ref={el2 => (this.el2 = el2)}
            />
          </FormGroup>
          <Button variant="primary" type="submit" onClick={this.props.togguru}>
            Add New
          </Button>
        </Form>
      </div>
    )
  }
}

export default AddTodo
