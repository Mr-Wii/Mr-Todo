import React from 'react'

const sortIt = ({ todos, filterState }) => {
  return (
    <div>
      <input
        type="text"
        onChange={e => filterState(e.target.value)}
        //   value={this.state.content}
        placeholder="Search Todos"
      />
    </div>
  )
}

export default sortIt
