import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'Work', label: 'Work' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Other', label: 'Other' }
]

class AddTodo extends Component {
  state = {
    content: '',
    isInEdit: false,
    category: null,
    deadline: '',
    creationDate: '',
    isDone: false
  }

  setDate = () => {
    const d = new Date(),
      dformat =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
    this.setState({
      creationDate: dformat
    })
  }

  categoryChange = selectedOption => {
    this.setState({
      category: selectedOption.value
    })
  }

  handleChange = e => {
    this.setState({
      content: e.target.value
    })
  }

  deadLine = e => {
    const owo = e.target.value
    this.setState({
      deadline: owo
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addTodo(this.state)
    this.setState({
      content: '',
      category: null,
      deadline: '',
      creationDate: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Add new task</label>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.content}
            placeholder="Title"
          />
          <input
            type="date"
            placeholder="Deadline:"
            onChange={this.deadLine}
            value={this.state.deadline}
          />
          <Select
            // value={this.state.category}
            onChange={this.categoryChange}
            options={options}
            placeholder="Category"
          />
          <input type="submit" onClick={this.setDate} />
        </form>
      </div>
    )
  }
}

export default AddTodo
