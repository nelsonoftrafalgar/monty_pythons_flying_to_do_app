import React, { useContext } from 'react'

import { ControlPanelContext } from '../../context/ControlPanelContext'

const SortSection = () => {
  const { sortBy, handleSort } = useContext(ControlPanelContext)

  return (
    <div>
      <p>Sort archive by:</p>
      <label><input type="radio" value="date-asc" checked={"date-asc" === sortBy} onChange={handleSort} /> Date ascending</label>
      <label><input type="radio" value="date-desc" checked={"date-desc" === sortBy} onChange={handleSort} /> Date descending</label>
      <label><input type="radio" value="rate-asc" checked={"rate-asc" === sortBy} onChange={handleSort} /> Rating ascending</label>
      <label><input type="radio" value="rate-desc" checked={"rate-desc" === sortBy} onChange={handleSort} /> Rating descending</label>
    </div>
  )
}

export { SortSection }