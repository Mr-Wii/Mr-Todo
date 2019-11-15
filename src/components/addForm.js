import React, { Component } from 'react'
import Select from 'react-select'
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap'
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
    const catg = this.el2.state.value.value
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
            />
            <FormControl
              type="date"
              placeholder="Deadline"
              ref={el1 => (this.el1 = el1)}
              defaultValue=""
            />
            <Select
              hasValue={true}
              options={this.props.optionsu}
              placeholder="Category"
              ref={el2 => (this.el2 = el2)}
              defaultValue=""
            />
          </FormGroup>
          <button id="addbtn" class="learn-more" type="submit">
            <span class="circle">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">Add</span>
          </button>
        </Form>
      </div>
    )
  }
}

export default AddTodo
