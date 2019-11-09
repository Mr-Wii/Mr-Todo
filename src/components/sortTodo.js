import React from 'react'

const sortIt = ({ filterState }) => {
  return (
    <div>
      <label htmlFor="inp" className="inp">
        <input
          id="inp"
          type="text"
          placeholder="&nbsp;"
          onChange={e => filterState(e.target.value)}
        />
        <span className="label">Search Todos</span>
        <span className="border"></span>
      </label>
    </div>
  )
}

export default sortIt
